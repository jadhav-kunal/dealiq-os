import type { CardData } from '../../types'
import StateIndicator from '../ui/StateIndicator'
import WhyThisMatters from '../ui/WhyThisMatters'
import { AlertTriangle } from 'lucide-react'

interface Props { card: CardData }

export default function CriticalCard({ card }: Props) {
  return (
    <div className="bg-lofty-surface border border-red-500/40 rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-2">
          <AlertTriangle size={15} className="text-red-400 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-medium text-sm">{card.title}</h3>
            {card.subtitle && <p className="text-xs text-gray-500 mt-0.5">{card.subtitle}</p>}
          </div>
        </div>
        <StateIndicator type="critical" />
      </div>

      {card.metric && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 mb-4">
          <span className="text-xs text-red-400 font-medium">{card.metric}</span>
        </div>
      )}

      <div className="flex gap-2 mt-auto">
        <button className="flex-1 py-2 bg-red-500 hover:bg-red-400 text-white text-xs font-semibold rounded-xl transition-colors">
          {card.actionLabel ?? 'Take Action'}
        </button>
        {card.secondaryActionLabel && (
          <button className="flex-1 py-2 border border-lofty-border hover:border-gray-500 text-xs text-gray-400 rounded-xl transition-colors">
            {card.secondaryActionLabel}
          </button>
        )}
      </div>

      {card.aiReason && <WhyThisMatters
          cardTitle={card.title}
          cardData={card.data ?? {}}
          staticReason={card.aiReason}
        />}
    </div>
  )
}