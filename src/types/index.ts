export type TrustLevel = 'auto' | 'approval' | 'manual'
export type CardType = 'auto' | 'approval' | 'critical' | 'revenue'
export type FocusMode = 'close_deals' | 'generate_leads' | 'balanced'

export interface UserProfile {
  name: string
  focusMode: FocusMode
  priorities: {
    deals: number   // 0-10
    leads: number
    tasks: number
  }
  trustLevels: {
    followUps: TrustLevel
    messages: TrustLevel
    negotiations: TrustLevel
    listings: TrustLevel
  }
  onboardingComplete: boolean
}

export interface CardData {
  id: string
  type: CardType
  title: string
  subtitle?: string
  metric?: string | number
  urgency: number        // 0-10, drives auto-sort
  revenueImpact: number  // $
  aiReason?: string      // "why this matters"
  actionLabel?: string
  secondaryActionLabel?: string
  data?: Record<string, unknown>
  completedAt?: string
}

export interface WorkspaceState {
  cards: CardData[]
  pinnedCardIds: string[]
  hiddenCardIds: string[]
}