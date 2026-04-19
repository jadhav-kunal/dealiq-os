import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal, Zap, Eye, Hand } from 'lucide-react'
import { useUserStore } from '../../store/useUserStore'
import { ALL_TABS } from '../../data/mockData'
import type { TrustLevel } from '../../types'

interface Props { open: boolean; onClose: () => void }

const levels: { value: TrustLevel; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: 'auto',     label: 'Auto',   icon: <Zap size={11} />,  desc: 'AI acts fully' },
  { value: 'approval', label: 'Ask Me', icon: <Eye size={11} />,  desc: 'AI drafts, you approve' },
  { value: 'manual',   label: 'Manual', icon: <Hand size={11} />, desc: 'You do it' },
]

const trustColors: Record<TrustLevel, { active: string; text: string }> = {
  auto:     { active: '#D1FAE5', text: '#065F46' },
  approval: { active: '#FEF3C7', text: '#92400E' },
  manual:   { active: '#F3F4F6', text: '#374151' },
}

export default function AIPreferencesPanel({ open, onClose }: Props) {
  const profile = useUserStore((s) => s.profile)
  const updateTabTrust = useUserStore((s) => s.updateTabTrust)
  if (!profile) return null

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30"
            style={{ background: 'rgba(15,17,23,0.3)' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-80 bg-white border-l border-lofty-border z-40 flex flex-col shadow-panel"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-lofty-border">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={14} style={{ color: '#3C5CDE' }} />
                <span className="font-semibold text-sm text-lofty-text">AI Settings</span>
              </div>
              <button onClick={onClose} className="p-1.5 hover:bg-lofty-surface rounded-lg transition-colors">
                <X size={14} className="text-lofty-muted" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
              <p className="text-xs text-lofty-muted mb-4">
                Control how much AI autonomy each section has. Change anytime.
              </p>

              {ALL_TABS.map((tab) => {
                const current = profile.tabConfigs[tab.id] ?? 'approval'
                return (
                  <div key={tab.id} className="border border-lofty-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <TabIcon tabId={tab.id} size={14} />
                      <span className="text-xs font-semibold text-lofty-text">{tab.label}</span>
                    </div>
                    <div className="flex gap-1.5">
                      {levels.map((lvl) => {
                        const isActive = current === lvl.value
                        const colors = trustColors[lvl.value]
                        return (
                          <button
                            key={lvl.value}
                            onClick={() => updateTabTrust(tab.id, lvl.value)}
                            className="flex-1 py-1.5 px-1 rounded-lg text-xs font-medium transition-all border flex items-center justify-center gap-1"
                            style={
                              isActive
                                ? { background: colors.active, color: colors.text, borderColor: 'transparent' }
                                : { background: 'transparent', color: '#9CA3AF', borderColor: '#E5E7EB' }
                            }
                          >
                            {lvl.icon}
                            {lvl.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              <div className="pt-4 border-t border-lofty-border">
                <button
                  onClick={() => { useUserStore.getState().resetProfile(); onClose(); window.location.href = '/onboarding' }}
                  className="w-full py-2.5 text-xs text-lofty-muted hover:text-red-500 border border-lofty-border hover:border-red-200 rounded-xl transition-colors"
                >
                  Reset onboarding
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Inline icon helper used across files
function TabIcon({ tabId, size = 14 }: { tabId: string; size?: number }) {
  const icons: Record<string, React.ReactNode> = {
    keep_in_touch: <Users size={size} />,
    new_leads:     <UserPlus size={size} />,
    opportunities: <TrendingUp size={size} />,
    transactions:  <FileText size={size} />,
    tasks:         <CheckSquare size={size} />,
    appointments:  <Calendar size={size} />,
    listings:      <Home size={size} />,
    hot_sheets:    <Flame size={size} />,
  }
  return <span className="text-lofty-muted">{icons[tabId] ?? null}</span>
}

import { Users, UserPlus, TrendingUp, FileText, CheckSquare, Calendar, Home, Flame } from 'lucide-react'