import { useState } from 'react'
import { useUserStore } from '../../store/useUserStore'
import { useWorkspaceStore } from '../../store/useWorkspaceStore'
import { RotateCcw, Settings, Brain } from 'lucide-react'
import AIPreferencesPanel from './AIPreferencesPanel'

export default function TopBar() {
  const profile = useUserStore((s) => s.profile)
  const { hiddenCardIds, resetLayout, cards } = useWorkspaceStore()
  const [panelOpen, setPanelOpen] = useState(false)

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const urgentCount = cards.filter(
    (c) => c.type === 'critical' || c.type === 'approval'
  ).length

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b border-lofty-border bg-lofty-dark/80 backdrop-blur-sm sticky top-0 z-20">
        {/* Left: logo + greeting */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-lofty-blue rounded-lg flex items-center justify-center text-xs font-bold">
            L
          </div>
          <div>
            <div className="text-sm font-semibold flex items-center gap-2">
              {greeting}, {profile?.name} 👋
              {urgentCount > 0 && (
                <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded-full">
                  {urgentCount} urgent
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 capitalize">
              Focus: {profile?.focusMode?.replace('_', ' ')}
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {hiddenCardIds.length > 0 && (
            <button
              onClick={resetLayout}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white border border-lofty-border hover:border-gray-500 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw size={12} />
              Reset ({hiddenCardIds.length} hidden)
            </button>
          )}

          <button
            onClick={() => setPanelOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-lofty-border hover:border-lofty-blue hover:bg-blue-950/20 transition-colors"
          >
            <Brain size={14} className="text-lofty-cyan" />
            <span className="text-xs text-gray-400">AI Settings</span>
          </button>

          <button
            onClick={() => setPanelOpen(true)}
            className="p-2 rounded-lg hover:bg-lofty-surface border border-transparent hover:border-lofty-border transition-colors"
          >
            <Settings size={16} className="text-gray-400" />
          </button>
        </div>
      </header>

      <AIPreferencesPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  )
}