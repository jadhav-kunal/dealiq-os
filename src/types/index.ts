export type TrustLevel = 'auto' | 'approval' | 'manual'
export type FocusMode = 'close_deals' | 'generate_leads' | 'balanced'

export type TabId =
  | 'keep_in_touch'
  | 'new_leads'
  | 'opportunities'
  | 'transactions'
  | 'tasks'
  | 'appointments'
  | 'listings'
  | 'hot_sheets'

export interface TabConfig {
  id: TabId
  label: string
  icon: string
  desc: string
  trustLevel: TrustLevel
}

export interface UserProfile {
  name: string
  priorityTabs: TabId[]
  tabConfigs: Record<TabId, TrustLevel>
  onboardingComplete: boolean
}

export interface Lead {
  id: string
  name: string
  score: number
  type: string
  source: string
  lastContact?: string
  birthday?: string
  note?: string
  draftMessage?: string
}

export interface Transaction {
  id: string
  address: string
  daysToClose: number
  stage: string
  missingDocs: string[]
  value: number
}

export interface Appointment {
  id: string
  clientName: string
  address: string
  time: string
  type: string
}

export interface Listing {
  id: string
  address: string
  price: string
  daysSinceEngagement: number
  status: string
}

export interface Task {
  id: string
  label: string
  type: 'call' | 'text' | 'email' | 'other'
  contact: string
  due: string
  done: boolean
}

export interface HotSheet {
  id: string
  label: string
  count: number
  newToday: number
}

export interface Notification {
  id: string
  title: string
  body: string
  date: string
  read: boolean
}