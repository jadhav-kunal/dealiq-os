import { useState } from 'react'
import { useUserStore } from '../../store/useUserStore'
import { Settings, SlidersHorizontal } from 'lucide-react'
import NotificationBell from './NotificationBell'
import AIPreferencesPanel from './AIPreferencesPanel'

export default function TopBar() {
  const profile = useUserStore((s) => s.profile)
  const [panelOpen, setPanelOpen] = useState(false)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <>
      <header className="flex items-center justify-between px-6 py-3.5 border-b border-lofty-border bg-white sticky top-0 z-20">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-semibold" style={{ background: '#3C5CDE' }}>
              L
            </div>
            <span className="font-semibold text-sm text-lofty-text tracking-tight">DealIQ</span>
          </div>

          <div className="w-px h-4 bg-lofty-border" />

          <div>
            <span className="text-sm font-medium text-lofty-text">
              {greeting}, {profile?.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <NotificationBell />
          <button
            onClick={() => setPanelOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-lofty-muted hover:bg-lofty-surface hover:text-lofty-text transition-colors text-xs font-medium border border-lofty-border"
          >
            <SlidersHorizontal size={13} />
            AI Settings
          </button>
        </div>
      </header>
      <AIPreferencesPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  )
}