import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Shield, Zap } from 'lucide-react'
import { useUserStore } from '../../store/useUserStore'
import type { TrustLevel, UserProfile } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
}

const trustItems: {
  key: keyof UserProfile['trustLevels']
  label: string
  desc: string
}[] = [
  { key: 'followUps', label: 'Follow-up emails & texts', desc: 'Automated nurture sequences' },
  { key: 'messages', label: 'Personalized messages', desc: 'Custom outreach to leads' },
  { key: 'listings', label: 'Listing promotions', desc: 'Boost and match buyers' },
  { key: 'negotiations', label: 'Negotiation suggestions', desc: 'Pricing and counter-offers' },
]

const levels: {
  value: TrustLevel
  label: string
  icon: string
  color: string
}[] = [
  { value: 'auto',     label: 'Auto',   icon: '⚡', color: 'border-green-500/50 bg-green-500/10 text-green-400' },
  { value: 'approval', label: 'Ask me', icon: '👁', color: 'border-amber-500/50 bg-amber-500/10 text-amber-400' },
  { value: 'manual',   label: 'Manual', icon: '✋', color: 'border-gray-500/50 bg-gray-500/10 text-gray-400' },
]

const focusModes: {
  value: UserProfile['focusMode']
  label: string
  desc: string
}[] = [
  { value: 'close_deals',    label: 'Close deals',    desc: 'Prioritize active transactions' },
  { value: 'generate_leads', label: 'Generate leads', desc: 'Surface new opportunities' },
  { value: 'balanced',       label: 'Balanced',       desc: 'Mix of everything' },
]

export default function AIPreferencesPanel({ open, onClose }: Props) {
  const profile = useUserStore((s) => s.profile)
  const setProfile = useUserStore((s) => s.setProfile)
  const updateTrustLevel = useUserStore((s) => s.updateTrustLevel)

  if (!profile) return null

  function setFocusMode(mode: UserProfile['focusMode']) {
    if (!profile) return
    setProfile({ ...profile, focusMode: mode })
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-30"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-80 bg-lofty-dark border-l border-lofty-border z-40 flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-lofty-border sticky top-0 bg-lofty-dark">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-lofty-cyan" />
                <span className="font-medium text-sm">AI Preferences</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-lofty-surface rounded-lg transition-colors"
              >
                <X size={15} className="text-gray-400" />
              </button>
            </div>

            <div className="flex-1 px-5 py-5 space-y-7">

              {/* Focus mode */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={13} className="text-lofty-blue" />
                  <span className="text-xs font-medium text-gray-300">Focus mode</span>
                </div>
                <div className="space-y-2">
                  {focusModes.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => setFocusMode(mode.value)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${
                        profile.focusMode === mode.value
                          ? 'border-lofty-blue bg-blue-950/40 text-white'
                          : 'border-lofty-border bg-lofty-surface text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <div className="font-medium text-xs">{mode.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust levels */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={13} className="text-lofty-cyan" />
                  <span className="text-xs font-medium text-gray-300">AI trust levels</span>
                </div>

                {/* Legend */}
                <div className="flex gap-3 mb-4 px-1">
                  {levels.map((l) => (
                    <div key={l.value} className="flex items-center gap-1">
                      <span className="text-xs">{l.icon}</span>
                      <span className="text-xs text-gray-600">{l.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {trustItems.map((item) => (
                    <div key={item.key} className="bg-lofty-surface border border-lofty-border rounded-xl p-4">
                      <div className="mb-3">
                        <div className="text-xs font-medium text-gray-300">{item.label}</div>
                        <div className="text-xs text-gray-600 mt-0.5">{item.desc}</div>
                      </div>
                      <div className="flex gap-1.5">
                        {levels.map((lvl) => (
                          <button
                            key={lvl.value}
                            onClick={() => updateTrustLevel(item.key, lvl.value)}
                            className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                              profile.trustLevels[item.key] === lvl.value
                                ? lvl.color
                                : 'border-lofty-border text-gray-600 hover:text-gray-400 hover:border-gray-500'
                            }`}
                          >
                            {lvl.icon} {lvl.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset onboarding */}
              <div className="pt-2 border-t border-lofty-border">
                <button
                  onClick={() => {
                    useUserStore.getState().resetProfile()
                    onClose()
                    window.location.href = '/onboarding'
                  }}
                  className="w-full py-2.5 text-xs text-gray-500 hover:text-red-400 border border-lofty-border hover:border-red-500/30 rounded-xl transition-colors"
                >
                  Reset onboarding & start over
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}