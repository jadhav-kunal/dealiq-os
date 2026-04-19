import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { arrayMove } from '@dnd-kit/sortable'
import type { UserProfile, TabId, TrustLevel } from '../types'

interface UserStore {
  profile: UserProfile | null
  setProfile: (profile: UserProfile) => void
  updateTabTrust: (tabId: TabId, level: TrustLevel) => void
  reorderPriorityTabs: (activeId: TabId, overId: TabId) => void
  resetProfile: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      updateTabTrust: (tabId, level) =>
        set((state) => ({
          profile: state.profile
            ? {
                ...state.profile,
                tabConfigs: { ...state.profile.tabConfigs, [tabId]: level },
              }
            : state.profile,
        })),
      reorderPriorityTabs: (activeId, overId) =>
        set((state) => {
          if (!state.profile) return state
          const tabs = state.profile.priorityTabs
          const oldIndex = tabs.indexOf(activeId)
          const newIndex = tabs.indexOf(overId)
          if (oldIndex === -1 || newIndex === -1) return state
          return {
            profile: {
              ...state.profile,
              priorityTabs: arrayMove(tabs, oldIndex, newIndex),
            },
          }
        }),
      resetProfile: () => set({ profile: null }),
    }),
    { name: 'dealiq-user-profile' }
  )
)