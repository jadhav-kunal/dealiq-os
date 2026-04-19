import { useEffect, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getMorningBriefing } from '../../api/claude'
import { useUserStore } from '../../store/useUserStore'
import type { CardData } from '../../types'

interface Props {
  cards: CardData[]
}

export default function MorningBriefing({ cards }: Props) {
  const profile = useUserStore((s) => s.profile)
  const [briefing, setBriefing] = useState('')
  const [loading, setLoading] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!profile) return
    const slim = cards.map((c) => ({
      title: c.title,
      type: c.type,
      urgency: c.urgency,
      revenueImpact: c.revenueImpact,
    }))
    getMorningBriefing(profile.name, profile.focusMode, slim)
      .then(setBriefing)
      .finally(() => setLoading(false))
  }, [])

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-5 bg-gradient-to-r from-blue-950/80 to-lofty-surface border border-blue-500/20 rounded-xl px-5 py-4 flex items-start gap-3"
        >
          <div className="mt-0.5 shrink-0">
            <Sparkles size={16} className="text-lofty-cyan" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-lofty-cyan mb-1">
              AI Morning Briefing
            </div>
            {loading ? (
              <div className="space-y-2">
                <div className="h-3 bg-lofty-border rounded animate-pulse w-full" />
                <div className="h-3 bg-lofty-border rounded animate-pulse w-3/4" />
              </div>
            ) : (
              <p className="text-sm text-gray-300 leading-relaxed">{briefing}</p>
            )}
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 p-1 hover:bg-white/5 rounded-lg transition-colors mt-0.5"
          >
            <X size={14} className="text-gray-500" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}