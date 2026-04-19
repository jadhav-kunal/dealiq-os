import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore } from '../../store/useUserStore'
import { ALL_TABS } from '../../data/mockData'
import type { TabId, TrustLevel, UserProfile } from '../../types'
import {
  Users, UserPlus, TrendingUp, FileText,
  CheckSquare, Calendar, Home, Flame,
} from 'lucide-react'

type Step = 'priorities' | 'trust' | 'name'

const TAB_ICONS: Record<TabId, React.ReactNode> = {
  keep_in_touch: <Users size={16} />,
  new_leads:     <UserPlus size={16} />,
  opportunities: <TrendingUp size={16} />,
  transactions:  <FileText size={16} />,
  tasks:         <CheckSquare size={16} />,
  appointments:  <Calendar size={16} />,
  listings:      <Home size={16} />,
  hot_sheets:    <Flame size={16} />,
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
    desc: 'AI acts fully — no input needed',
    bg: '#D1FAE5',
    text: '#065F46',
    border: '#A7F3D0',
  },
  {
    value: 'approval',
    label: 'Ask Me',
    desc: 'AI drafts, you approve or edit',
    bg: '#FEF3C7',
    text: '#92400E',
    border: '#FDE68A',
  },
  {
    value: 'manual',
    label: 'Manual',
    desc: 'AI suggests only, you act',
    bg: '#F3F4F6',
    text: '#374151',
    border: '#E5E7EB',
  },
]

export default function OnboardingFlow() {
  const navigate = useNavigate()
  const setProfile = useUserStore((s) => s.setProfile)

  const [step, setStep] = useState<Step>('priorities')
  const [selected, setSelected] = useState<TabId[]>([])
  const [trustMap, setTrustMap] = useState<Partial<Record<TabId, TrustLevel>>>({})
  const [name, setName] = useState('')
  const [direction, setDirection] = useState(1)

  function toggleTab(id: TabId) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  function setTrust(id: TabId, level: TrustLevel) {
    setTrustMap((prev) => ({ ...prev, [id]: level }))
  }

  function goTo(next: Step, dir: number) {
    setDirection(dir)
    setStep(next)
  }

  function finish() {
    const defaultTrust: Record<TabId, TrustLevel> = {
      keep_in_touch: 'approval',
      new_leads:     'approval',
      opportunities: 'approval',
      transactions:  'manual',
      tasks:         'auto',
      appointments:  'manual',
      listings:      'approval',
      hot_sheets:    'auto',
    }
    const tabConfigs = { ...defaultTrust, ...trustMap } as Record<TabId, TrustLevel>

    const profile: UserProfile = {
      name: name.trim() || 'Agent',
      priorityTabs: selected.length > 0
        ? selected
        : ['new_leads', 'opportunities', 'keep_in_touch'],
      tabConfigs,
      onboardingComplete: true,
    }
    setProfile(profile)
    navigate('/workspace')
  }

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ?  48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -48 :  48, opacity: 0 }),
  }

  const stepIndex = step === 'priorities' ? 0 : step === 'trust' ? 1 : 2

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">

      {/* Logo */}
      <div className="mb-10 flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
          style={{ background: '#3C5CDE' }}
        >
          L
        </div>
        <span className="text-xl font-semibold text-lofty-text tracking-tight">DealIQ OS</span>
        <span className="text-xs text-lofty-subtle ml-1">by Lofty</span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex gap-1.5">
          {(['priorities', 'trust', 'name'] as Step[]).map((s, i) => (
            <div
              key={s}
              className="h-1 flex-1 rounded-full transition-all duration-500"
              style={{ background: i <= stepIndex ? '#3C5CDE' : '#E5E7EB' }}
            />
          ))}
        </div>
        <p className="text-xs text-lofty-subtle mt-2 text-right">
          Step {stepIndex + 1} of 3
        </p>
      </div>

      {/* Animated step content */}
      <div className="w-full max-w-2xl overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >

            {/* ── Step 1: Priority tabs ── */}
            {step === 'priorities' && (
              <div>
                <h2 className="text-2xl font-semibold text-lofty-text mb-1">
                  What matters most to you?
                </h2>
                <p className="text-lofty-muted text-sm mb-6">
                  Select the areas you focus on daily. These will appear front-and-center on your dashboard.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {ALL_TABS.map((tab) => {
                    const isSelected = selected.includes(tab.id)
                    return (
                      <button
                        key={tab.id}
                        onClick={() => toggleTab(tab.id)}
                        className={`text-left px-4 py-4 rounded-xl border transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'border-lofty-blue bg-lofty-blue-light'
                            : 'border-lofty-border bg-white hover:border-lofty-blue hover:bg-lofty-surface'
                        }`}
                      >
                        {/* Icon */}
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{
                            background: isSelected ? '#3C5CDE' : '#F3F4F6',
                            color: isSelected ? '#fff' : '#6B7280',
                          }}
                        >
                          {TAB_ICONS[tab.id]}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-lofty-text">
                            {tab.label}
                          </div>
                          <div className="text-xs text-lofty-muted mt-0.5 leading-relaxed">
                            {tab.desc}
                          </div>
                        </div>

                        {/* Check */}
                        {isSelected && (
                          <div
                            className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                            style={{ background: '#3C5CDE' }}
                          >
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path
                                d="M1 4L3.5 6.5L9 1"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xs text-lofty-muted">
                    {selected.length === 0
                      ? 'Select at least one area'
                      : `${selected.length} selected — will appear above the fold`}
                  </p>
                  <button
                    disabled={selected.length === 0}
                    onClick={() => goTo('trust', 1)}
                    className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: '#3C5CDE' }}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2: Trust levels ── */}
            {step === 'trust' && (
              <div>
                <h2 className="text-2xl font-semibold text-lofty-text mb-1">
                  How much should AI handle?
                </h2>
                <p className="text-lofty-muted text-sm mb-6">
                  Set AI autonomy for each section you selected. You can change this anytime.
                </p>

                <div className="space-y-3">
                  {selected.map((tabId) => {
                    const tab = ALL_TABS.find((t) => t.id === tabId)!
                    const current = trustMap[tabId] ?? 'approval'

                    return (
                      <div
                        key={tabId}
                        className="bg-white border border-lofty-border rounded-xl p-4"
                      >
                        {/* Tab header */}
                        <div className="flex items-center gap-2.5 mb-3">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: '#EBEFFC', color: '#3C5CDE' }}
                          >
                            {TAB_ICONS[tabId]}
                          </div>
                          <span className="text-sm font-semibold text-lofty-text">
                            {tab.label}
                          </span>
                        </div>

                        {/* Trust options */}
                        <div className="grid grid-cols-3 gap-2">
                          {trustOptions.map((opt) => {
                            const isActive = current === opt.value
                            return (
                              <button
                                key={opt.value}
                                onClick={() => setTrust(tabId, opt.value)}
                                className="py-2.5 px-3 rounded-xl border text-xs font-medium transition-all text-left"
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
                                <div className="text-xs leading-tight opacity-80">
                                  {opt.desc}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => goTo('priorities', -1)}
                    className="text-sm text-lofty-muted hover:text-lofty-text transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => goTo('name', 1)}
                    className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold transition-colors"
                    style={{ background: '#3C5CDE' }}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3: Name ── */}
            {step === 'name' && (
              <div>
                <h2 className="text-2xl font-semibold text-lofty-text mb-1">
                  Last one — what's your name?
                </h2>
                <p className="text-lofty-muted text-sm mb-6">
                  DealIQ will personalize your morning briefings and AI messages.
                </p>

                <input
                  type="text"
                  placeholder="Your first name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && name.trim() && finish()}
                  autoFocus
                  className="w-full bg-lofty-surface border border-lofty-border rounded-xl px-5 py-4 text-lg text-lofty-text outline-none transition-colors placeholder:text-lofty-subtle focus:border-lofty-blue"
                />

                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => goTo('trust', -1)}
                    className="text-sm text-lofty-muted hover:text-lofty-text transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    disabled={!name.trim()}
                    onClick={finish}
                    className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: '#3C5CDE' }}
                  >
                    Build my workspace →
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}