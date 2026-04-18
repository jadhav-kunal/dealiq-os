import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile } from '../types'

interface UserStore {
  profile: UserProfile | null
  setProfile: (profile: UserProfile) => void
  updateTrustLevel: (key: keyof UserProfile['trustLevels'], level: UserProfile['trustLevels'][keyof UserProfile['trustLevels']]) => void
  resetProfile: () => void
}

const defaultProfile: UserProfile = {
  name: 'James',
  focusMode: 'balanced',
  priorities: { deals: 7, leads: 6, tasks: 4 },
  trustLevels: {
    followUps: 'auto',
    messages: 'approval',
    negotiations: 'manual',
    listings: 'approval',
  },
  onboardingComplete: false,
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      updateTrustLevel: (key, level) =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, trustLevels: { ...state.profile.trustLevels, [key]: level } }
            : state.profile,
        })),
      resetProfile: () => set({ profile: null }),
    }),
    { name: 'dealiq-user-profile' }
  )
)