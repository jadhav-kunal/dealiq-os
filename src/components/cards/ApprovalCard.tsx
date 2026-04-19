import { useState } from 'react'
import type { CardData } from '../../types'
import StateIndicator from '../ui/StateIndicator'
import WhyThisMatters from '../ui/WhyThisMatters'
import { CheckCheck, Pencil } from 'lucide-react'

interface Props { card: CardData }

export default function ApprovalCard({ card }: Props) {
  const [approved, setApproved] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState((card.data?.draft as string) ?? '')

  if (approved) {
    return (
      <div className="bg-lofty-surface border border-green-500/30 rounded-2xl p-5 h-full">
        <div className="flex items-center gap-2 text-green-400">
          <CheckCheck size={16} />
          <span className="text-sm font-medium">Sent!</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{card.title} — done</p>
      </div>
    )
  }

  return (
    <div className="bg-lofty-surface border border-amber-500/30 rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-sm">{card.title}</h3>
          {card.subtitle && <p className="text-xs text-gray-500 mt-0.5">{card.subtitle}</p>}
        </div>
        <StateIndicator type="approval" />
      </div>

      {/* Draft message */}
      {draft && (
        <div className="flex-1 mb-4">
          {editing ? (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full bg-lofty-dark border border-lofty-border rounded-xl p-3 text-xs text-gray-300 resize-none outline-none focus:border-amber-500/50 transition-colors"
              rows={3}
            />
          ) : (
            <div className="bg-lofty-dark/60 rounded-xl p-3 text-xs text-gray-400 italic leading-relaxed">
              "{draft}"
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => setApproved(true)}
          className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold rounded-xl transition-colors"
        >
          {card.actionLabel ?? 'Approve'}
        </button>
        <button
          onClick={() => setEditing((e) => !e)}
          className="px-3 py-2 border border-lofty-border hover:border-gray-500 rounded-xl transition-colors"
        >
          <Pencil size={13} className="text-gray-400" />
        </button>
      </div>

      {card.aiReason && <WhyThisMatters reason={card.aiReason} />}
    </div>
  )
}