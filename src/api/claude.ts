import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://openai.rc.asu.edu/v1',
  apiKey: import.meta.env.VITE_ASU_API_KEY ?? '',
  dangerouslyAllowBrowser: true,
})

const MODEL = 'llama4-scout-17b'

async function callAI(system: string, user: string): Promise<string> {
  try {
    const response = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    })
    return response.choices[0]?.message?.content ?? ''
  } catch (err) {
    console.error('AI call failed:', err)
    return ''
  }
}

export async function getWhyThisMatters(
  cardTitle: string,
  cardData: Record<string, unknown>,
  staticReason?: string
): Promise<string> {
  const result = await callAI(
    `You are an AI assistant for real estate agents using Lofty CRM. 
     Be concise, specific, and data-driven. 2 sentences max. 
     Focus on WHY they should act NOW and what the consequence of inaction is.`,
    `Why should this real estate agent act on this immediately?
     Card: "${cardTitle}"
     Data: ${JSON.stringify(cardData)}
     ${staticReason ? `Context: ${staticReason}` : ''}`
  )
  return result || staticReason || 'This item needs your attention.'
}

export async function getMorningBriefing(
  agentName: string,
  focusMode: string,
  cards: { title: string; type: string; urgency: number; revenueImpact: number }[]
): Promise<string> {
  const result = await callAI(
    `You are an AI chief of staff for a real estate agent named ${agentName}.
     Generate a punchy 2-sentence morning briefing.
     Lead with the single most important thing they should do first.
     Be specific, mention names or numbers from the data. No fluff.`,
    `Agent focus: ${focusMode}.
     Today's priority cards: ${JSON.stringify(cards.slice(0, 4))}`
  )
  return result || `Good morning ${agentName}! Here's what needs your attention today.`
}