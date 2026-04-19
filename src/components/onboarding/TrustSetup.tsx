import type { UserProfile, TrustLevel } from '../../types'
import { ALL_TABS } from '../../data/mockData'
import {
  Users, UserPlus, TrendingUp, FileText,
  CheckSquare, Calendar, Home, Flame,
} from 'lucide-react'
import type { TabId } from '../../types'
import React from 'react'

const TAB_ICONS: Record<TabId, React.ReactNode> = {
  keep_in_touch: <Users size={14} />,
  new_leads:     <UserPlus size={14} />,
  opportunities: <TrendingUp size={14} />,
  transactions:  <FileText size={14} />,
  tasks:         <CheckSquare size={14} />,
  appointments:  <Calendar size={14} />,
  listings:      <Home size={14} />,
  hot_sheets:    <Flame size={14} />,
}

const trustOptions: {
  value: TrustLevel
  label: string
  desc: string
  bg: string
  text: string
  border: string
}[] = [
  {
    value: 'auto',
    label: 'Auto',
    desc: 'AI acts fully',
    bg: '#D1FAE5',
    text: '#065F46',
    border: '#A7F3D0',
  },
  {
    value: 'approval',
    label: 'Ask Me',
    desc: 'AI drafts, you approve',
    bg: '#FEF3C7',
    text: '#92400E',
    border: '#FDE68A',
  },
  {
    value: 'manual',
    label: 'Manual',
    desc: 'AI suggests only',
    bg: '#F3F4F6',
    text: '#374151',
    border: '#E5E7EB',
  },
]

interface Props {
  selectedTabs?: TabId[]
  trustLevels: Partial<Record<TabId, TrustLevel>>
  onChange: (tabId: TabId, level: TrustLevel) => void
}

export default function TrustSetup({ selectedTabs, trustLevels, onChange }: Props) {
  const tabs = selectedTabs
    ? ALL_TABS.filter((t) => selectedTabs.includes(t.id))
    : ALL_TABS

  return (
    <div className="space-y-3">
      {tabs.map((tab) => {
        const current = trustLevels[tab.id] ?? 'approval'

        return (
          <div
            key={tab.id}
            className="bg-white border border-lofty-border rounded-xl p-4"
          >
            {/* Tab header */}
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: '#EBEFFC', color: '#3C5CDE' }}
              >
                {TAB_ICONS[tab.id]}
              </div>
              <div>
                <div className="text-xs font-semibold text-lofty-text">{tab.label}</div>
                <div className="text-xs text-lofty-subtle mt-0.5">{tab.desc}</div>
              </div>
            </div>

            {/* Trust buttons */}
            <div className="grid grid-cols-3 gap-2">
              {trustOptions.map((opt) => {
                const isActive = current === opt.value
                return (
                  <button
                    key={opt.value}
                    onClick={() => onChange(tab.id, opt.value)}
                    className="py-2 px-2.5 rounded-xl border text-xs font-medium transition-all text-left"
                    style={
                      isActive
                        ? {
                            background: opt.bg,
                            color: opt.text,
                            borderColor: opt.border,
                          }
                        : {
                            background: 'transparent',
                            color: '#9CA3AF',
                            borderColor: '#E5E7EB',
                          }
                    }
                  >
                    <div className="font-semibold mb-0.5">{opt.label}</div>
                    <div className="text-xs leading-tight opacity-75">{opt.desc}</div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}