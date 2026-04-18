import type { CardData } from '../types'

export const mockCards: CardData[] = [
  {
    id: 'revenue-today',
    type: 'revenue',
    title: "Today's Revenue Potential",
    metric: '$24,500',
    urgency: 10,
    revenueImpact: 24500,
    aiReason: 'Based on 3 high-intent leads and 2 transactions closing this week.',
    data: {
      breakdown: [
        { action: 'Call Rob Adam (score 88)', value: 12000 },
        { action: 'Send counter-offer to Martinez deal', value: 8500 },
        { action: 'Follow up Kristin Watson birthday', value: 4000 },
      ]
    }
  },
  {
    id: 'critical-deal-1',
    type: 'critical',
    title: 'Deal at Risk',
    subtitle: '3931 Via Montalvo, Campbell CA — closing deadline in 48h',
    metric: '2 tasks overdue',
    urgency: 9,
    revenueImpact: 18000,
    actionLabel: 'View Deal',
    secondaryActionLabel: 'Get AI Summary',
    aiReason: 'Inspection contingency expires tomorrow. Appointment date and offer date missing from file.',
    data: {
      address: '3931 Via Montalvo, Campbell, CA 95008',
      daysToClose: 2,
      missingDocs: ['Inspection report', 'Counter-offer'],
    }
  },
  {
    id: 'approval-rob',
    type: 'approval',
    title: 'High-Value Lead Ready',
    subtitle: 'Rob Adam — Lead Score 88 — Facebook Ads',
    urgency: 8,
    revenueImpact: 12000,
    actionLabel: 'Send Message',
    secondaryActionLabel: 'Edit',
    aiReason: 'Rob viewed 4 properties in the last 24h and score jumped from 71 to 88. Similar leads converted within 3 days of first contact.',
    data: {
      draft: "Hi Rob! I noticed you've been checking out some great properties lately. I'd love to schedule a quick call to discuss what you're looking for. Would tomorrow at 10am work?",
      leadScore: 88,
      source: 'Facebook Ads',
    }
  },
  {
    id: 'auto-followups',
    type: 'auto',
    title: 'AI Handled Today',
    urgency: 2,
    revenueImpact: 0,
    aiReason: 'Smart Plans executed 6 follow-ups, 2 birthday messages, and 3 lead nurture sequences automatically.',
    data: {
      actions: [
        { label: '6 follow-up emails sent', done: true },
        { label: '2 birthday messages delivered', done: true },
        { label: '3 leads enrolled in Smart Plans', done: true },
      ]
    }
  },
  {
    id: 'approval-kristin',
    type: 'approval',
    title: "Kristin's Birthday — Today",
    subtitle: 'Kristin Watson — Buyer · Seller · Investor',
    urgency: 7,
    revenueImpact: 4000,
    actionLabel: 'Send Greeting',
    secondaryActionLabel: 'Customize',
    aiReason: "Relationship milestone. Agents who reach out on birthdays see 3x higher re-engagement rates. Kristin hasn't been contacted in 14 days.",
    data: {
      draft: "Happy Birthday Kristin! Wishing you a wonderful day. Looking forward to helping you find your dream home this year!",
      contactType: 'Engaged client',
    }
  },
  {
    id: 'critical-listing',
    type: 'critical',
    title: 'Listing Needs Attention',
    subtitle: '1824 Saint Peter St, Riverside — 15 days no engagement',
    urgency: 6,
    revenueImpact: 6000,
    actionLabel: 'Boost Listing',
    secondaryActionLabel: 'Reduce Price',
    aiReason: 'No views, saves, or inquiries in 15 days. Similar listings in this zip code reduced price by 3% and received offers within a week.',
    data: {
      address: '1824 Saint Peter St, Riverside, CA 10192',
      daysSinceEngagement: 15,
      suggestedPriceReduction: '3%',
    }
  },
]

export const mockAgentData = {
  name: 'James',
  leadsToday: 23,
  untouchedLeads: 12,
  transactionsNearDeadline: 3,
  appointmentsToday: 4,
  tasksDueToday: 10,
}