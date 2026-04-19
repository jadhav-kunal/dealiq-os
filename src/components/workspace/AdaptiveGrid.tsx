import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Users, UserPlus, TrendingUp, FileText, CheckSquare, Calendar, Home, Flame, Zap, Eye, Hand } from 'lucide-react'
import {
  DndContext, closestCenter, PointerSensor,
  useSensor, useSensors, DragOverlay,
  type DragEndEvent, type DragStartEvent,
} from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { useUserStore } from '../../store/useUserStore'
import { ALL_TABS } from '../../data/mockData'
import TopBar from '../layout/TopBar'
import MorningBriefing from '../layout/MorningBriefing'
import TabPanel from './TabPanel'
import SortableTabCard from './SortableTabCard'
import type { TabId, TrustLevel } from '../../types'

export const TAB_ICONS: Record<TabId, React.ReactNode> = {
  keep_in_touch: <Users size={18} />,
  new_leads:     <UserPlus size={18} />,
  opportunities: <TrendingUp size={18} />,
  transactions:  <FileText size={18} />,
  tasks:         <CheckSquare size={18} />,
  appointments:  <Calendar size={18} />,
  listings:      <Home size={18} />,
  hot_sheets:    <Flame size={18} />,
}

export const TRUST_CONFIG: Record<TrustLevel, { label: string; icon: React.ReactNode; bg: string; text: string; border: string }> = {
  auto:     { label: 'Auto',   icon: <Zap size={10} />,  bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0' },
  approval: { label: 'Ask Me', icon: <Eye size={10} />,  bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
  manual:   { label: 'Manual', icon: <Hand size={10} />, bg: '#F3F4F6', text: '#374151', border: '#E5E7EB' },
}

const tabSummaries: Record<TabId, string> = {
  keep_in_touch: '3 contacts need attention · 1 birthday today',
  new_leads:     '23 new leads · 12 untouched · Top score: 88',
  opportunities: '8 high interest · 3 back to site · 3 sell signals',
  transactions:  '3 near deadline · $41K commission at stake',
  tasks:         '10 tasks due today · 4 calls · 2 texts',
  appointments:  '4 today · 23 total · 12 incomplete',
  listings:      '3 active · 1 with no engagement in 15 days',
  hot_sheets:    '4 saved searches · 70 new matches today',
}

export default function AdaptiveGrid() {
  const profile = useUserStore((s) => s.profile)
  const reorderPriorityTabs = useUserStore((s) => s.reorderPriorityTabs)
  const [activeTab, setActiveTab] = useState<TabId | null>(null)
  const [moreOpen, setMoreOpen] = useState(false)
  const [draggingId, setDraggingId] = useState<TabId | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  if (!profile) return null

  const priorityTabs = ALL_TABS
    .filter((t) => profile.priorityTabs.includes(t.id))
    .sort((a, b) => profile.priorityTabs.indexOf(a.id) - profile.priorityTabs.indexOf(b.id))

  const moreTabs = ALL_TABS.filter((t) => !profile.priorityTabs.includes(t.id))
  const activeTabData = activeTab ? ALL_TABS.find((t) => t.id === activeTab) : null
  const draggingTab = draggingId ? ALL_TABS.find((t) => t.id === draggingId) : null

  function handleDragStart(e: DragStartEvent) { setDraggingId(e.active.id as TabId) }
  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (over && active.id !== over.id) reorderPriorityTabs(active.id as TabId, over.id as TabId)
    setDraggingId(null)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar />

      <main className="flex-1 px-6 py-6 max-w-5xl mx-auto w-full">
        <MorningBriefing tabs={priorityTabs} />

        {/* Section label */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-lofty-muted">
            Priority areas · drag to reorder
          </p>
        </div>

        {/* Draggable priority tab cards */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={priorityTabs.map((t) => t.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {priorityTabs.map((tab) => (
                <SortableTabCard
                  key={tab.id}
                  tabId={tab.id}
                  label={tab.label}
                  icon={TAB_ICONS[tab.id]}
                  summary={tabSummaries[tab.id]}
                  trustLevel={profile.tabConfigs[tab.id] ?? 'approval'}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {draggingTab && (
              <div
                className="rounded-2xl p-5 shadow-modal pointer-events-none rotate-1 scale-105 bg-white border"
                style={{ borderColor: '#3C5CDE' }}
              >
                <div className="mb-3" style={{ color: '#3C5CDE' }}>{TAB_ICONS[draggingTab.id]}</div>
                <div className="font-semibold text-sm text-lofty-text">{draggingTab.label}</div>
              </div>
            )}
          </DragOverlay>
        </DndContext>

        {/* More sections */}
        {moreTabs.length > 0 && (
          <div className="mt-6">
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className="flex items-center gap-1.5 text-xs font-medium text-lofty-muted hover:text-lofty-text transition-colors mb-3"
            >
              {moreOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              {moreOpen ? 'Hide' : 'Show'} {moreTabs.length} more sections
            </button>

            <AnimatePresence>
              {moreOpen && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {moreTabs.map((tab) => {
                    const trust: TrustLevel = profile.tabConfigs[tab.id] ?? 'approval'
                    const tc = TRUST_CONFIG[trust]
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="text-left bg-white border border-lofty-border hover:border-lofty-blue rounded-xl p-3.5 transition-all hover:shadow-card group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lofty-muted group-hover:text-lofty-blue transition-colors">
                            {TAB_ICONS[tab.id]}
                          </span>
                          <span
                            className="text-xs font-medium px-1.5 py-0.5 rounded-md flex items-center gap-1"
                            style={{ background: tc.bg, color: tc.text }}
                          >
                            {tc.icon}{tc.label}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-lofty-text leading-tight">{tab.label}</div>
                      </button>
                    )
                  })}
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      <AnimatePresence>
        {activeTab && activeTabData && (
          <TabPanel
            key={activeTab}
            tabId={activeTab}
            label={activeTabData.label}
            icon={TAB_ICONS[activeTab]}
            trustLevel={profile.tabConfigs[activeTab] ?? 'approval'}
            onClose={() => setActiveTab(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}