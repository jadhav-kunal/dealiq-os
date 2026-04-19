import type { CardData } from '../../types'
import StateIndicator from '../ui/StateIndicator'
import WhyThisMatters from '../ui/WhyThisMatters'
import { CheckCircle2 } from 'lucide-react'

interface Props { card: CardData }

export default function AutoCard({ card }: Props) {
  const actions = (card.data?.actions ?? []) as { label: string; done: boolean }[]

  return (
    <div className="bg-lofty-surface border border-lofty-border rounded-2xl p-5 h-full">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-sm">{card.title}</h3>
        <StateIndicator type="auto" />
      </div>

      {actions.length > 0 && (
        <div className="space-y-2 mb-1">
          {actions.map((action, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <CheckCircle2 size={14} className="text-green-400 shrink-0" />
              <span className="text-xs text-gray-400">{action.label}</span>
            </div>
          ))}
        </div>
      )}

      {card.aiReason && <WhyThisMatters reason={card.aiReason} />}
    </div>
  )
}