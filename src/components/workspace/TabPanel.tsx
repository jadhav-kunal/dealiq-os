import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, CheckCheck, Pencil, AlertTriangle, Phone, Mail,
  MessageSquare, Zap, Eye, Hand, Users, UserPlus,
  TrendingUp, FileText, CheckSquare, Calendar, Home, Flame,
} from 'lucide-react'
import type { TabId, TrustLevel } from '../../types'
import {
  mockKeepInTouch, mockNewLeads, mockOpportunities,
  mockTransactions, mockTasks, mockAppointments,
  mockListings, mockHotSheets,
} from '../../data/mockData'
import WhyThisMatters from '../ui/WhyThisMatters'

interface Props {
  tabId: TabId
  label: string
  icon: React.ReactNode
  trustLevel: TrustLevel
  onClose: () => void
}

const trustConfig: Record<TrustLevel, { label: string; icon: React.ReactNode; bg: string; text: string; border: string }> = {
  auto:     { label: 'Auto',   icon: <Zap size={11} />,  bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0' },
  approval: { label: 'Ask Me', icon: <Eye size={11} />,  bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
  manual:   { label: 'Manual', icon: <Hand size={11} />, bg: '#F3F4F6', text: '#374151', border: '#E5E7EB' },
}

export default function TabPanel({ tabId, label, icon, trustLevel, onClose }: Props) {
  const tc = trustConfig[trustLevel]

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-30"
        style={{ background: 'rgba(15,17,23,0.4)' }}
      />
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ type: 'spring', damping: 32, stiffness: 360 }}
          className="pointer-events-auto w-full max-w-lg max-h-[85vh] bg-white border border-lofty-border rounded-2xl flex flex-col shadow-modal"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-lofty-border shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#EBEFFC', color: '#3C5CDE' }}>
                {icon}
              </div>
              <span className="font-semibold text-sm text-lofty-text">{label}</span>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-lg flex items-center gap-1 border"
                style={{ background: tc.bg, color: tc.text, borderColor: tc.border }}
              >
                {tc.icon} {tc.label}
              </span>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-lofty-surface rounded-lg transition-colors">
              <X size={14} className="text-lofty-muted" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <TabContent tabId={tabId} trustLevel={trustLevel} />
          </div>
        </motion.div>
      </div>
    </>
  )
}

function AutoBanner() {
  return (
    <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-medium mb-4 border"
      style={{ background: '#D1FAE5', color: '#065F46', borderColor: '#A7F3D0' }}>
      <Zap size={13} /> AI is handling this section automatically.
    </div>
  )
}

function ScorePill({ score }: { score: number }) {
  const bg = score >= 70 ? '#D1FAE5' : score >= 50 ? '#FEF3C7' : '#F3F4F6'
  const text = score >= 70 ? '#065F46' : score >= 50 ? '#92400E' : '#374151'
  return (
    <span className="text-xs font-bold px-2 py-0.5 rounded-lg shrink-0" style={{ background: bg, color: text }}>
      {score}
    </span>
  )
}

function ContactCard({ lead, trustLevel }: { lead: any; trustLevel: TrustLevel }) {
  const [sent, setSent] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(lead.draftMessage ?? '')
  const [customMsg, setCustomMsg] = useState('')

  if (sent) {
    return (
      <div className="border border-lofty-border rounded-xl px-4 py-3 flex items-center gap-2 text-xs font-medium"
        style={{ color: '#065F46', background: '#F0FDF4' }}>
        <CheckCheck size={14} /> Sent to {lead.name}
      </div>
    )
  }

  return (
    <div className="bg-white border border-lofty-border rounded-xl p-4 hover:shadow-card transition-shadow">
      <div className="flex items-start justify-between mb-2 gap-2">
        <div className="min-w-0">
          <div className="font-semibold text-sm text-lofty-text">{lead.name}</div>
          <div className="text-xs text-lofty-muted mt-0.5">{lead.type} · {lead.source}</div>
          {lead.birthday && (
            <div className="text-xs font-medium mt-0.5" style={{ color: '#D97706' }}>
              Birthday — {lead.birthday}
            </div>
          )}
          {lead.lastContact && <div className="text-xs text-lofty-subtle mt-0.5">Last contact: {lead.lastContact}</div>}
          {lead.note && <div className="text-xs text-lofty-muted mt-0.5 italic">{lead.note}</div>}
        </div>
        <ScorePill score={lead.score} />
      </div>

      {trustLevel === 'auto' && (
        <div className="mt-3 text-xs font-medium rounded-lg px-3 py-2 flex items-center gap-1.5"
          style={{ background: '#F0FDF4', color: '#16A34A' }}>
          <CheckCheck size={12} /> AI sent message automatically
        </div>
      )}

      {trustLevel === 'approval' && draft && (
        <div className="mt-3">
          {editing ? (
            <textarea value={draft} onChange={(e) => setDraft(e.target.value)}
              className="w-full bg-lofty-surface border border-lofty-border rounded-xl p-3 text-xs text-lofty-text resize-none outline-none transition-colors focus:border-lofty-blue"
              rows={3} />
          ) : (
            <div className="bg-lofty-surface rounded-xl p-3 text-xs text-lofty-muted italic leading-relaxed border border-lofty-border">
              "{draft}"
            </div>
          )}
          <div className="flex gap-2 mt-2">
            <button onClick={() => setSent(true)}
              className="flex-1 py-2 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              style={{ background: '#3C5CDE' }}>
              <CheckCheck size={12} /> Approve & Send
            </button>
            <button onClick={() => setEditing((e) => !e)}
              className="px-3 py-2 border border-lofty-border hover:bg-lofty-surface rounded-xl transition-colors">
              <Pencil size={13} className="text-lofty-muted" />
            </button>
          </div>
        </div>
      )}

      {trustLevel === 'manual' && (
        <div className="mt-3 space-y-2">
          <div className="text-xs text-lofty-muted bg-lofty-blue-light rounded-lg px-3 py-2 border border-lofty-blue-mid">
            Suggested: Send a {lead.birthday ? 'birthday greeting' : 'check-in message'}
          </div>
          <textarea value={customMsg} onChange={(e) => setCustomMsg(e.target.value)}
            placeholder="Write your message..."
            className="w-full bg-lofty-surface border border-lofty-border rounded-xl p-3 text-xs text-lofty-text resize-none outline-none focus:border-lofty-blue transition-colors placeholder:text-lofty-subtle"
            rows={3} />
          <div className="flex gap-2">
            {[{ icon: <Phone size={11} />, label: 'Call' }, { icon: <MessageSquare size={11} />, label: 'Text' }, { icon: <Mail size={11} />, label: 'Email' }].map((a) => (
              <button key={a.label}
                className="flex-1 py-1.5 border border-lofty-border hover:bg-lofty-surface text-xs text-lofty-muted rounded-xl transition-colors flex items-center justify-center gap-1 font-medium">
                {a.icon} {a.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <WhyThisMatters
        cardTitle={lead.name}
        cardData={{ score: lead.score, source: lead.source, birthday: lead.birthday }}
        staticReason={`${lead.name} needs attention — ${lead.source?.toLowerCase()}.`}
      />
    </div>
  )
}

function TabContent({ tabId, trustLevel }: { tabId: TabId; trustLevel: TrustLevel }) {
  switch (tabId) {
    case 'keep_in_touch':
      return <div className="space-y-3">{trustLevel === 'auto' && <AutoBanner />}{mockKeepInTouch.map((l) => <ContactCard key={l.id} lead={l} trustLevel={trustLevel} />)}</div>
    case 'new_leads':
    case 'opportunities':
      const leads = tabId === 'new_leads' ? mockNewLeads : mockOpportunities
      return <div className="space-y-3">{trustLevel === 'auto' && <AutoBanner />}<p className="text-xs text-lofty-muted">{leads.length} contacts</p>{leads.map((l) => <ContactCard key={l.id} lead={l} trustLevel={trustLevel} />)}</div>
    case 'transactions':
      return (
        <div className="space-y-3">
          {trustLevel === 'auto' && <AutoBanner />}
          {mockTransactions.map((t) => (
            <div key={t.id} className={`bg-white border rounded-xl p-4 ${t.daysToClose <= 3 ? 'border-red-200' : 'border-lofty-border'}`}>
              <div className="flex items-start gap-2 mb-2">
                {t.daysToClose <= 3 && <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />}
                <div>
                  <div className="text-sm font-semibold text-lofty-text leading-tight">{t.address}</div>
                  <div className="text-xs text-lofty-muted mt-0.5">{t.stage} · Closes in {t.daysToClose} days · ${t.value.toLocaleString()}</div>
                </div>
              </div>
              {t.missingDocs.map((doc) => (
                <div key={doc} className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                  <span className="w-1 h-1 rounded-full bg-red-400 inline-block" /> Missing: {doc}
                </div>
              ))}
              {trustLevel === 'approval' && (
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2 text-white text-xs font-semibold rounded-xl" style={{ background: '#3C5CDE' }}>Review Summary</button>
                  <button className="flex-1 py-2 border border-lofty-border text-xs text-lofty-muted rounded-xl">View Deal</button>
                </div>
              )}
              {trustLevel === 'manual' && (
                <div className="mt-3 text-xs text-lofty-muted bg-lofty-blue-light rounded-lg px-3 py-2 border border-lofty-blue-mid">
                  Upload missing docs and confirm appointment date before deadline
                </div>
              )}
              {trustLevel === 'auto' && (
                <div className="mt-3 text-xs font-medium rounded-lg px-3 py-2 flex items-center gap-1.5" style={{ background: '#F0FDF4', color: '#16A34A' }}>
                  <CheckCheck size={12} /> AI sent deadline reminders
                </div>
              )}
            </div>
          ))}
        </div>
      )
    case 'tasks':
      return <TasksContent trustLevel={trustLevel} />
    case 'appointments':
      return (
        <div className="space-y-3">
          {trustLevel === 'auto' && <AutoBanner />}
          {mockAppointments.map((a) => (
            <div key={a.id} className="bg-white border border-lofty-border rounded-xl p-4">
              <div className="text-sm font-semibold text-lofty-text">{a.clientName}</div>
              <div className="text-xs text-lofty-muted mt-1">{a.address}</div>
              <div className="text-xs text-lofty-muted mt-0.5">{a.time} · {a.type}</div>
              {trustLevel === 'manual' && (
                <div className="flex gap-2 mt-3">
                  {['Accept', 'Reschedule', 'Reassign'].map((action) => (
                    <button key={action} className="flex-1 py-1.5 border border-lofty-border text-xs text-lofty-muted hover:bg-lofty-surface rounded-xl transition-colors font-medium">{action}</button>
                  ))}
                </div>
              )}
              {trustLevel === 'approval' && (
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2 text-white text-xs font-semibold rounded-xl" style={{ background: '#3C5CDE' }}>Confirm</button>
                  <button className="flex-1 py-2 border border-lofty-border text-xs text-lofty-muted rounded-xl">Reschedule</button>
                </div>
              )}
              {trustLevel === 'auto' && (
                <div className="mt-3 text-xs font-medium rounded-lg px-3 py-2 flex items-center gap-1.5" style={{ background: '#F0FDF4', color: '#16A34A' }}>
                  <CheckCheck size={12} /> AI confirmed with client
                </div>
              )}
            </div>
          ))}
        </div>
      )
    case 'listings':
      return (
        <div className="space-y-3">
          {trustLevel === 'auto' && <AutoBanner />}
          {mockListings.map((l) => (
            <div key={l.id} className={`bg-white border rounded-xl p-4 ${l.daysSinceEngagement > 10 ? 'border-amber-200' : 'border-lofty-border'}`}>
              <div className="text-sm font-semibold text-lofty-text">{l.address}</div>
              <div className="text-xs text-lofty-muted mt-1">{l.price} · {l.status}</div>
              {l.daysSinceEngagement > 10 && (
                <div className="text-xs font-medium mt-1" style={{ color: '#D97706' }}>
                  No engagement in {l.daysSinceEngagement} days
                </div>
              )}
              {trustLevel === 'manual' && (
                <div className="mt-3 text-xs text-lofty-muted bg-lofty-blue-light rounded-lg px-3 py-2 border border-lofty-blue-mid">
                  Suggested: Reduce price by 3% or boost listing to matched buyers
                </div>
              )}
              {trustLevel === 'approval' && l.daysSinceEngagement > 10 && (
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2 text-white text-xs font-semibold rounded-xl" style={{ background: '#3C5CDE' }}>Boost Listing</button>
                  <button className="flex-1 py-2 border border-lofty-border text-xs text-lofty-muted rounded-xl">Reduce Price</button>
                </div>
              )}
              {trustLevel === 'auto' && (
                <div className="mt-3 text-xs font-medium rounded-lg px-3 py-2 flex items-center gap-1.5" style={{ background: '#F0FDF4', color: '#16A34A' }}>
                  <CheckCheck size={12} /> Matched to 12 buyers automatically
                </div>
              )}
            </div>
          ))}
        </div>
      )
    case 'hot_sheets':
      return (
        <div className="space-y-3">
          {trustLevel === 'auto' && <AutoBanner />}
          {mockHotSheets.map((hs) => (
            <div key={hs.id} className="bg-white border border-lofty-border rounded-xl p-4 flex items-center justify-between hover:shadow-card transition-shadow">
              <div>
                <div className="text-sm font-semibold text-lofty-text">{hs.label}</div>
                <div className="text-xs text-lofty-muted mt-0.5">{hs.count.toLocaleString()} total</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold" style={{ color: '#3C5CDE' }}>+{hs.newToday}</div>
                <div className="text-xs text-lofty-subtle">today</div>
              </div>
            </div>
          ))}
        </div>
      )
    default: return null
  }
}

function TasksContent({ trustLevel }: { trustLevel: TrustLevel }) {
  const [done, setDone] = useState<string[]>(mockTasks.filter((t) => t.done).map((t) => t.id))
  const iconMap = { call: <Phone size={12} />, text: <MessageSquare size={12} />, email: <Mail size={12} />, other: null }

  return (
    <div className="space-y-2">
      {trustLevel === 'auto' && <AutoBanner />}
      {mockTasks.map((task) => {
        const isDone = done.includes(task.id)
        return (
          <div key={task.id}
            className={`flex items-start gap-3 px-4 py-3 rounded-xl border transition-all ${isDone ? 'opacity-50 border-lofty-border' : 'border-lofty-border bg-white hover:shadow-card'}`}>
            <button
              onClick={() => setDone((d) => isDone ? d.filter((x) => x !== task.id) : [...d, task.id])}
              className="w-4 h-4 rounded border mt-0.5 shrink-0 flex items-center justify-center transition-colors"
              style={isDone ? { background: '#3C5CDE', borderColor: '#3C5CDE' } : { borderColor: '#D1D5DB' }}
            >
              {isDone && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-medium ${isDone ? 'line-through text-lofty-subtle' : 'text-lofty-text'}`}>{task.label}</div>
              <div className="text-xs text-lofty-muted mt-0.5">{task.contact} · {task.due}</div>
            </div>
            <div className="text-lofty-subtle mt-0.5">{iconMap[task.type]}</div>
          </div>
        )
      })}
    </div>
  )
}