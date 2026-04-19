import { useUserStore } from '../../store/useUserStore'
import { useWorkspaceStore } from '../../store/useWorkspaceStore'
import { LayoutGrid, RotateCcw, Settings } from 'lucide-react'

export default function TopBar() {
  const profile = useUserStore((s) => s.profile)
  const { hiddenCardIds, resetLayout } = useWorkspaceStore()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-lofty-border bg-lofty-dark/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-lofty-blue rounded-lg flex items-center justify-center text-xs font-bold">L</div>
        <div>
          <div className="text-sm font-semibold">
            {greeting}, {profile?.name} 👋
          </div>
          <div className="text-xs text-gray-500 capitalize">
            Focus: {profile?.focusMode?.replace('_', ' ')}
          </div>
        </div>
      </div>

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
        <button className="p-2 rounded-lg hover:bg-lofty-surface border border-transparent hover:border-lofty-border transition-colors">
          <LayoutGrid size={16} className="text-gray-400" />
        </button>
        <button className="p-2 rounded-lg hover:bg-lofty-surface border border-transparent hover:border-lofty-border transition-colors">
          <Settings size={16} className="text-gray-400" />
        </button>
      </div>
    </header>
  )
}