import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore } from '../../store/useUserStore'
import QuestionStep from './QuestionStep'
import TrustSetup from './TrustSetup'
import type { UserProfile, FocusMode, TrustLevel } from '../../types'

const steps = [
  {
    id: 'focus',
    question: 'What matters most to you right now?',
    subtitle: 'DealIQ will prioritize your workspace around this.',
    options: [
      { value: 'close_deals', label: 'Closing deals', icon: '🏠', desc: 'Focus on active transactions and high-intent leads' },
      { value: 'generate_leads', label: 'Finding new clients', icon: '🎯', desc: 'Surface new leads and outreach opportunities' },
      { value: 'balanced', label: 'Stay balanced', icon: '⚖️', desc: 'Mix of lead gen, nurturing, and deal management' },
    ],
  },
  {
    id: 'frustration',
    question: "What frustrates you most today?",
    subtitle: "We'll make sure AI handles this for you.",
    options: [
      { value: 'too_many_leads', label: 'Too many leads to track', icon: '📋', desc: "Can't keep up with who needs follow-up" },
      { value: 'missing_followups', label: 'Missing follow-ups', icon: '⏰', desc: 'Leads going cold because I forget to reach out' },
      { value: 'losing_deals', label: 'Losing deals at the last minute', icon: '📉', desc: 'Transactions falling through due to missed deadlines' },
      { value: 'admin_overload', label: 'Too much admin work', icon: '📄', desc: 'Paperwork eating into selling time' },
    ],
  },
  {
    id: 'trust',
    question: 'What can AI do without asking you?',
    subtitle: 'You stay in control. Set your comfort level.',
    isTrustStep: true,
  },
  {
    id: 'name',
    question: "Last one — what's your name?",
    subtitle: 'DealIQ will personalize your morning briefings.',
    isNameStep: true,
  },
]

export default function OnboardingFlow() {
  const navigate = useNavigate()
  const setProfile = useUserStore((s) => s.setProfile)
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [trustLevels, setTrustLevels] = useState<UserProfile['trustLevels']>({
    followUps: 'auto',
    messages: 'approval',
    negotiations: 'manual',
    listings: 'approval',
  })
  const [name, setName] = useState('')

  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1

  function handleAnswer(value: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: value }))
    if (!step.isTrustStep && !step.isNameStep) {
      goNext()
    }
  }

  function goNext() {
    setDirection(1)
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
  }

  function goBack() {
    setDirection(-1)
    setCurrentStep((s) => Math.max(s - 1, 0))
  }

  function finish() {
    const focusMap: Record<string, FocusMode> = {
      close_deals: 'close_deals',
      generate_leads: 'generate_leads',
      balanced: 'balanced',
    }
    const focus = focusMap[answers.focus] ?? 'balanced'

    const priorities = {
      close_deals: { deals: 9, leads: 5, tasks: 4 },
      generate_leads: { deals: 4, leads: 9, tasks: 5 },
      balanced: { deals: 7, leads: 6, tasks: 5 },
    }[focus]

    const profile: UserProfile = {
      name: name.trim() || 'Agent',
      focusMode: focus,
      priorities,
      trustLevels,
      onboardingComplete: true,
    }
    setProfile(profile)
    navigate('/workspace')
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div className="w-8 h-8 bg-lofty-blue rounded-lg flex items-center justify-center font-bold text-sm">L</div>
        <span className="text-xl font-semibold tracking-tight">DealIQ OS</span>
        <span className="text-xs text-gray-500 ml-1">by Lofty</span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-500"
              style={{ background: i <= currentStep ? '#1E88E5' : '#1E3A5F' }}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2 text-right">{currentStep + 1} of {steps.length}</p>
      </div>

      {/* Step content */}
      <div className="w-full max-w-lg overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <h2 className="text-2xl font-semibold mb-2">{step.question}</h2>
            <p className="text-gray-400 mb-8 text-sm">{step.subtitle}</p>

            {step.isTrustStep ? (
              <TrustSetup trustLevels={trustLevels} onChange={setTrustLevels} />
            ) : step.isNameStep ? (
              <div>
                <input
                  type="text"
                  placeholder="Your first name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && name.trim() && finish()}
                  autoFocus
                  className="w-full bg-lofty-surface border border-lofty-border rounded-xl px-5 py-4 text-lg outline-none focus:border-lofty-blue transition-colors placeholder:text-gray-600"
                />
              </div>
            ) : (
              <QuestionStep
                options={step.options!}
                selected={answers[step.id]}
                onSelect={handleAnswer}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="w-full max-w-lg mt-8 flex items-center justify-between">
        <button
          onClick={goBack}
          disabled={currentStep === 0}
          className="text-sm text-gray-500 hover:text-white disabled:opacity-0 transition-colors"
        >
          ← Back
        </button>

        {(step.isTrustStep || step.isNameStep) && (
          <button
            onClick={isLast ? finish : goNext}
            disabled={step.isNameStep && !name.trim()}
            className="px-6 py-2.5 bg-lofty-blue hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-medium transition-colors"
          >
            {isLast ? 'Build my workspace →' : 'Continue →'}
          </button>
        )}
      </div>
    </div>
  )
}