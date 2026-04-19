import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { useWorkspaceStore } from '../../store/useWorkspaceStore'
import { useUserStore } from '../../store/useUserStore'
import { prioritizeCards } from '../../utils/prioritizer'
import SortableCard from './SortableCard'
import CardContainer from './CardContainer'
import TopBar from '../layout/TopBar'
import RevenueCard from '../cards/RevenueCard'
import MorningBriefing from '../layout/MorningBriefing'

const focusDescriptions = {
  close_deals:    'Deals and high-intent leads are ranked first.',
  generate_leads: 'New leads and outreach opportunities are ranked first.',
  balanced:       'Cards ranked by urgency and revenue impact.',
}

export default function AdaptiveGrid() {
  const { cards, pinnedCardIds, hiddenCardIds, reorderCards } = useWorkspaceStore()
  const profile = useUserStore((s) => s.profile)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const { pinned, sortable } = prioritizeCards(cards, pinnedCardIds, hiddenCardIds)
  const activeCard = cards.find((c) => c.id === activeId)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      reorderCards(active.id as string, over.id as string)
    }
    setActiveId(null)
  }

  const focusDesc = focusDescriptions[profile?.focusMode ?? 'balanced']

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      <main className="flex-1 px-6 py-6 max-w-6xl mx-auto w-full">

        {/* Morning briefing */}
        <MorningBriefing cards={sortable} />

        {/* Context bar */}
        <div className="mb-5 bg-lofty-surface border border-lofty-border rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-lofty-cyan animate-pulse shrink-0" />
          <p className="text-xs text-gray-400">
            <span className="text-white font-medium">DealIQ</span> —{' '}
            <span className="text-lofty-cyan capitalize">
              {profile?.focusMode?.replace('_', ' ')}
            </span>{' '}
            mode. {focusDesc} Drag cards to reorder manually.
          </p>
        </div>

        {/* Pinned revenue card */}
        {pinned.map((card) => (
          <div key={card.id} className="mb-4">
            <RevenueCard card={card} />
          </div>
        ))}

        {/* Sortable grid */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortable.map((c) => c.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortable.map((card) => (
                <SortableCard key={card.id} card={card} />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeCard && (
              <div className="rotate-1 opacity-90 scale-105 pointer-events-none">
                <CardContainer card={activeCard} />
              </div>
            )}
          </DragOverlay>
        </DndContext>

        {/* Empty state */}
        {sortable.length === 0 && pinned.length === 0 && (
          <div className="text-center py-24 text-gray-600">
            <div className="text-4xl mb-4">🎯</div>
            <p className="text-sm font-medium text-gray-400">All caught up!</p>
            <p className="text-xs text-gray-600 mt-1">No cards to show.</p>
            <button
              onClick={() => useWorkspaceStore.getState().resetLayout()}
              className="mt-4 text-xs text-lofty-blue hover:underline"
            >
              Reset workspace
            </button>
          </div>
        )}

      </main>
    </div>
  )
}