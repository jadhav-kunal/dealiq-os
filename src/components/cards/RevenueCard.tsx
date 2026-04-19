import type { CardData } from '../../types'
import WhyThisMatters from '../ui/WhyThisMatters'
import { TrendingUp } from 'lucide-react'

interface Props { card: CardData }

export default function RevenueCard({ card }: Props) {
  const breakdown = (card.data?.breakdown ?? []) as { action: string; value: number }[]

  return (
    <div className="bg-gradient-to-br from-blue-950/60 to-lofty-surface border border-blue-500/30 rounded-2xl p-5 card-revenue">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-lofty-blue" />
            <span className="text-xs font-medium text-blue-400">Today's Revenue Potential</span>
          </div>
          <div className="text-3xl font-bold text-white">{card.metric}</div>
        </div>
        <div className="text-xs text-gray-500 bg-lofty-dark/60 px-2 py-1 rounded-lg">Pinned</div>
      </div>

      {breakdown.length > 0 && (
        <div className="space-y-2">
          {breakdown.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                <span className="text-xs text-gray-400">{item.action}</span>
              </div>
              <span className="text-xs font-medium text-white">
                ${item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {card.aiReason && <WhyThisMatters reason={card.aiReason} />}
    </div>
  )
}