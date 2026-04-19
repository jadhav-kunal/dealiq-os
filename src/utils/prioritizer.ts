import type { CardData } from '../types'

export function prioritizeCards(cards: CardData[], pinnedIds: string[], hiddenIds: string[]): {
  pinned: CardData[]
  sortable: CardData[]
} {
  const visible = cards.filter((c) => !hiddenIds.includes(c.id))
  const pinned = visible.filter((c) => pinnedIds.includes(c.id))
  const sortable = visible.filter((c) => !pinnedIds.includes(c.id))

  const hour = new Date().getHours()
  const isMorning = hour < 12

  // Morning: leads first. Evening: follow-ups + deals first
//   const sorted = [...sortable].sort((a, b) => {
//     const aScore = a.urgency * 10 + (a.revenueImpact / 1000) + (isMorning && a.type === 'approval' ? 5 : 0)
//     const bScore = b.urgency * 10 + (b.revenueImpact / 1000) + (isMorning && b.type === 'approval' ? 5 : 0)
//     return bScore - aScore
//   })

  return { pinned, sortable }
}