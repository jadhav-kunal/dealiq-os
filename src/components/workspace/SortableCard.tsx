import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, EyeOff } from 'lucide-react'
import type { CardData } from '../../types'
import CardContainer from './CardContainer'
import { useWorkspaceStore } from '../../store/useWorkspaceStore'

interface Props { card: CardData }

export default function SortableCard({ card }: Props) {
  const hideCard = useWorkspaceStore((s) => s.hideCard)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 rounded-lg hover:bg-white/5"
      >
        <GripVertical size={14} className="text-gray-600" />
      </div>

      {/* Hide button */}
      <button
        onClick={() => hideCard(card.id)}
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-white/5"
      >
        <EyeOff size={13} className="text-gray-600" />
      </button>

      <CardContainer card={card} isDragging={isDragging} />
    </div>
  )
}