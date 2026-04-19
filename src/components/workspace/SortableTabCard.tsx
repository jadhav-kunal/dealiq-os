import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import type { TabId, TrustLevel } from '../../types'
import { TRUST_CONFIG } from './AdaptiveGrid'

interface Props {
  tabId: TabId
  label: string
  icon: React.ReactNode
  summary: string
  trustLevel: TrustLevel
  onClick: () => void
}

export default function SortableTabCard({ tabId, label, icon, summary, trustLevel, onClick }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tabId })
  const tc = TRUST_CONFIG[trustLevel]

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="relative group bg-white border border-lofty-border hover:border-lofty-blue rounded-2xl p-5 transition-all hover:shadow-card cursor-pointer"
      onClick={onClick}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 rounded-lg hover:bg-lofty-surface"
      >
        <GripVertical size={13} className="text-lofty-subtle" />
      </div>

      {/* Icon + trust badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: '#EBEFFC', color: '#3C5CDE' }}
        >
          {icon}
        </div>
        <span
          className="text-xs font-medium px-2 py-1 rounded-lg flex items-center gap-1"
          style={{ background: tc.bg, color: tc.text }}
        >
          {tc.icon}
          {tc.label}
        </span>
      </div>

      {/* Label */}
      <div className="font-semibold text-sm text-lofty-text mb-1.5">{label}</div>

      {/* Summary */}
      <div className="text-xs text-lofty-muted leading-relaxed">{summary}</div>
    </div>
  )
}