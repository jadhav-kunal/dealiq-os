import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { arrayMove } from '@dnd-kit/sortable'
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
          const oldIndex = state.cards.findIndex((c) => c.id === activeId)
          const newIndex = state.cards.findIndex((c) => c.id === overId)
          console.log('store reorder:', activeId, oldIndex, '→', overId, newIndex)
          console.log('cards before:', state.cards.map(c => c.id))
          const result = arrayMove(state.cards, oldIndex, newIndex)
          console.log('cards after:', result.map(c => c.id))
          return { cards: result }
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