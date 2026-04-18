import { motion } from 'framer-motion'

interface Option {
  value: string
  label: string
  icon: string
  desc: string
}

interface Props {
  options: Option[]
  selected?: string
  onSelect: (value: string) => void
}

export default function QuestionStep({ options, selected, onSelect }: Props) {
  return (
    <div className="grid gap-3">
      {options.map((opt, i) => (
        <motion.button
          key={opt.value}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          onClick={() => onSelect(opt.value)}
          className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-start gap-4 group ${
            selected === opt.value
              ? 'border-lofty-blue bg-blue-950/40'
              : 'border-lofty-border bg-lofty-surface hover:border-blue-500/50 hover:bg-lofty-surface/80'
          }`}
        >
          <span className="text-2xl mt-0.5 shrink-0">{opt.icon}</span>
          <div>
            <div className="font-medium text-sm">{opt.label}</div>
            <div className="text-gray-400 text-xs mt-0.5">{opt.desc}</div>
          </div>
          {selected === opt.value && (
            <div className="ml-auto mt-0.5 shrink-0 w-5 h-5 rounded-full bg-lofty-blue flex items-center justify-center">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  )
}