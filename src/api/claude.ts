const CLAUDE_API = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-20250514'

export async function askClaude(systemPrompt: string, userMessage: string): Promise<string> {
  const response = await fetch(CLAUDE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })
  const data = await response.json()
  return data.content?.[0]?.text ?? ''
}

export async function getWhyThisMatters(cardTitle: string, cardData: Record<string, unknown>): Promise<string> {
  return askClaude(
    'You are an AI assistant for real estate agents using Lofty CRM. Be concise, specific, and data-driven. Max 2 sentences.',
    `Why should a real estate agent act on this right now? Card: "${cardTitle}". Data: ${JSON.stringify(cardData)}`
  )
}

export async function getMorningBriefing(agentName: string, cards: unknown[]): Promise<string> {
  return askClaude(
    'You are an AI chief of staff for a real estate agent. Generate a 3-sentence morning briefing covering their top 3 priorities for the day. Be specific and action-oriented.',
    `Agent: ${agentName}. Today's data: ${JSON.stringify(cards)}`
  )
}