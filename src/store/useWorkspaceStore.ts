import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Notification } from '../types'
import { mockNotifications } from '../data/mockData'

interface WorkspaceStore {
  notifications: Notification[]
  markRead: (id: string) => void
  markAllRead: () => void
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      notifications: mockNotifications,
      markRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
    }),
    { name: 'dealiq-workspace' }
  )
)