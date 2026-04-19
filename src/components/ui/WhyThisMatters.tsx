import { useState } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getWhyThisMatters } from '../../api/claude'

interface Props {
  cardTitle: string
  cardData: Record<string, unknown>
  staticReason?: string
}

export default function WhyThisMatters({ cardTitle, cardData, staticReason }: Props) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState(staticReason ?? '')
  const [loading, setLoading] = useState(false)
  const [fetched, setFetched] = useState(false)

  async function handleOpen() {
    const next = !open
    setOpen(next)
    if (next && !fetched) {
      setLoading(true)
      const live = await getWhyThisMatters(cardTitle, cardData, staticReason)
      setReason(live)
      setFetched(true)
      setLoading(false)
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-lofty-border">
      <button
        onClick={handleOpen}
        className="flex items-center gap-1.5 text-xs text-lofty-muted hover:text-lofty-text transition-colors w-full"
      >
        <Sparkles size={11} style={{ color: '#3C5CDE' }} />
        <span className="font-medium">Why this matters</span>
        <ChevronDown size={12} className={`ml-auto transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            {loading ? (
              <div className="mt-2 space-y-1.5">
                <div className="h-2.5 rounded-full animate-pulse w-full" style={{ background: '#EBEFFC' }} />
                <div className="h-2.5 rounded-full animate-pulse w-4/5" style={{ background: '#EBEFFC' }} />
              </div>
            ) : (
              <p className="text-xs text-lofty-muted mt-2 leading-relaxed">{reason}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}