import { useState } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  reason: string
}

export default function WhyThisMatters({ reason }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-3 border-t border-lofty-border pt-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors w-full"
      >
        <Sparkles size={11} className="text-lofty-cyan" />
        <span>Why this matters</span>
        <ChevronDown
          size={12}
          className={`ml-auto transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">{reason}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}