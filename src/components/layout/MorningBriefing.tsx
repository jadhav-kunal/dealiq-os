import { useEffect, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getMorningBriefing } from '../../api/claude'
import { useUserStore } from '../../store/useUserStore'

interface Props {
  tabs: { id: string; label: string }[]
}

export default function MorningBriefing({ tabs }: Props) {
  const profile = useUserStore((s) => s.profile)
  const [briefing, setBriefing] = useState('')
  const [loading, setLoading] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!profile) return
    getMorningBriefing(
      profile.name,
      profile.priorityTabs.join(', '),
      tabs.map((t) => ({ title: t.label, type: 'tab', urgency: 5, revenueImpact: 0 }))
    )
      .then(setBriefing)
      .finally(() => setLoading(false))
  }, [])

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mb-5 rounded-xl px-5 py-4 flex items-start gap-3 border"
          style={{ background: '#EBEFFC', borderColor: '#C7D2F8' }}
        >
          <Sparkles size={15} className="mt-0.5 shrink-0" style={{ color: '#3C5CDE' }} />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold mb-1" style={{ color: '#3C5CDE' }}>
              AI Briefing
            </div>
            {loading ? (
              <div className="space-y-2">
                <div className="h-3 rounded-full animate-pulse w-full" style={{ background: '#C7D2F8' }} />
                <div className="h-3 rounded-full animate-pulse w-3/4" style={{ background: '#C7D2F8' }} />
              </div>
            ) : (
              <p className="text-sm text-lofty-text leading-relaxed">{briefing}</p>
            )}
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 p-1 hover:bg-white/60 rounded-lg transition-colors"
          >
            <X size={13} className="text-lofty-muted" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}