import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CardData } from '../types'
import { mockCards } from '../data/mockData'

interface WorkspaceStore {
  cards: CardData[]
  pinnedCardIds: string[]
  hiddenCardIds: string[]
  reorderCards: (activeId: string, overId: string) => void
  hideCard: (id: string) => void
  pinCard: (id: string) => void
  unpinCard: (id: string) => void
  resetLayout: () => void
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      cards: mockCards,
      pinnedCardIds: ['revenue-today'],
      hiddenCardIds: [],
      reorderCards: (activeId, overId) =>
        set((state) => {
          const items = [...state.cards]
          const oldIndex = items.findIndex((c) => c.id === activeId)
          const newIndex = items.findIndex((c) => c.id === overId)
          const [moved] = items.splice(oldIndex, 1)
          items.splice(newIndex, 0, moved)
          return { cards: items }
        }),
      hideCard: (id) =>
        set((state) => ({ hiddenCardIds: [...state.hiddenCardIds, id] })),
      pinCard: (id) =>
        set((state) => ({ pinnedCardIds: [...state.pinnedCardIds, id] })),
      unpinCard: (id) =>
        set((state) => ({ pinnedCardIds: state.pinnedCardIds.filter((p) => p !== id) })),
      resetLayout: () =>
        set({ cards: mockCards, pinnedCardIds: ['revenue-today'], hiddenCardIds: [] }),
    }),
    { name: 'dealiq-workspace' }
  )
)