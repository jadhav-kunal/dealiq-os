import type {
  Lead, Transaction, Appointment,
  Listing, Task, HotSheet, Notification, TabId
} from '../types'

export const ALL_TABS: { id: TabId; label: string; icon: string; desc: string }[] = [
  { id: 'keep_in_touch', label: 'Need Keep In Touch', icon: '💬', desc: 'Birthdays, follow-ups, and relationship milestones' },
  { id: 'new_leads',     label: "Today's New Leads",  icon: '🎯', desc: 'Leads captured today from IDX, ads, and landing pages' },
  { id: 'opportunities', label: "Today's Opportunities", icon: '⚡', desc: 'High-interest signals: Back to Site, Sell, High Interest' },
  { id: 'transactions',  label: 'Transactions',        icon: '📋', desc: 'Active deals tracked from offer to closing' },
  { id: 'tasks',         label: "Today's Tasks",       icon: '✅', desc: 'Calls, texts, emails due today from Smart Plans' },
  { id: 'appointments',  label: 'Appointments & Showings', icon: '📅', desc: 'Scheduled tours and client meetings' },
  { id: 'listings',      label: 'My Listings',         icon: '🏠', desc: 'Properties you are currently marketing for sale' },
  { id: 'hot_sheets',    label: 'Hot Sheets',          icon: '🔥', desc: 'Real-time MLS filters with buyer matching' },
]

export const mockKeepInTouch: Lead[] = [
  { id: 'k1', name: 'Kristin Watson', score: 74, type: 'Buyer · Seller · Investor', source: 'Engaged', birthday: 'Today', draftMessage: 'Happy Birthday Kristin! Wishing you a wonderful day. Looking forward to helping you find your dream home this year!' },
  { id: 'k2', name: 'James Adam',     score: 61, type: 'Buyer · Seller', source: 'Follow-up due', lastContact: '14 days ago', draftMessage: "Hi James, just checking in! Have you had a chance to look at those listings I sent over? I'd love to schedule a walkthrough." },
  { id: 'k3', name: 'Maria Chen',     score: 55, type: 'Investor', source: 'Birthday in 3 days', draftMessage: "Hi Maria! Your birthday is coming up — wishing you all the best. Let's catch up soon!" },
]

export const mockNewLeads: Lead[] = [
  { id: 'l1', name: 'Rob Adam',       score: 88, type: 'Buyer · Seller', source: 'Facebook Ads', note: 'Viewed 4 properties in last 24h', draftMessage: "Hi Rob! I noticed you've been checking out some great properties. I'd love to schedule a quick call — would tomorrow at 10am work?" },
  { id: 'l2', name: 'Michael Scott',  score: 44, type: 'Buyer', source: 'Website', note: 'Saved 2 listings' },
  { id: 'l3', name: 'Jessica Philips', score: 61, type: 'Buyer · Seller · Investor', source: 'Website', note: 'Requested home valuation' },
]

export const mockOpportunities: Lead[] = [
  { id: 'o1', name: 'Annette Black', score: 78, type: 'Buyer', source: 'High Interest', note: 'Lead score jumped 15pts — toured property page 3x today', draftMessage: "Hi Annette! I saw you've been exploring some great homes. I'd love to set up a showing — when works best for you?" },
  { id: 'o2', name: 'Wade Warren',   score: 71, type: 'Buyer · Seller · Investor · Agent', source: 'Back To Site', note: 'Returned after 6 days away — viewed $750k listings', draftMessage: "Hey Wade! Great to see you back. Found some new listings that match what you were looking at — want me to send them over?" },
  { id: 'o3', name: 'Linda Park',    score: 82, type: 'Seller', source: 'Sell', note: 'Requested home evaluation form' },
]

export const mockTransactions: Transaction[] = [
  { id: 't1', address: '3931 Via Montalvo, Campbell, CA 95008', daysToClose: 2, stage: 'Under Contract', missingDocs: ['Inspection report', 'Counter-offer'], value: 18000 },
  { id: 't2', address: '87 Valencia St, Half Moon Bay, CA 94019', daysToClose: 5, stage: 'Pending', missingDocs: ['Title commitment'], value: 14500 },
  { id: 't3', address: '2118 Thornridge Cir, Syracuse, CT', daysToClose: 12, stage: 'Active', missingDocs: [], value: 9200 },
]

export const mockTasks: Task[] = [
  { id: 'tk1', label: 'Call back for more information', type: 'call',  contact: 'Rob Adam',      due: '10:00 AM', done: false },
  { id: 'tk2', label: 'Call-Back follow up',            type: 'call',  contact: 'James Adam',    due: 'Anytime',  done: false },
  { id: 'tk3', label: 'Spanish speaking — follow up',   type: 'text',  contact: 'Michael Scott', due: '12:00 PM', done: false },
  { id: 'tk4', label: 'Send listing comparison',        type: 'email', contact: 'Dav Smith',     due: '2:00 PM',  done: false },
  { id: 'tk5', label: 'Confirm showing appointment',    type: 'call',  contact: 'Linda Park',    due: '3:00 PM',  done: true  },
]

export const mockAppointments: Appointment[] = [
  { id: 'a1', clientName: 'William Johnson & Annie Campbell', address: '182 Saint Peter St, Riverside, CA', time: '11:00 AM – 2:00 PM', type: 'Showing' },
  { id: 'a2', clientName: 'William Johnson & Annie Campbell', address: '182 Saint Peter St, Riverside, CA', time: '11:00 AM – 2:00 PM', type: 'Showing' },
  { id: 'a3', clientName: 'Rob Adam',                        address: '1824 Saint Peter St, Riverside, CA', time: '4:00 PM – 5:00 PM', type: 'Consultation' },
]

export const mockListings: Listing[] = [
  { id: 'li1', address: '182 Saint Peter St, Riverside, CA 10192',  price: '$485,000', daysSinceEngagement: 2,  status: 'Active' },
  { id: 'li2', address: '1824 Saint Peter St, Riverside, CA 10192', price: '$520,000', daysSinceEngagement: 15, status: 'Stale' },
  { id: 'li3', address: '182 Saint Peter St, Riverside, CA 10192',  price: '$485,000', daysSinceEngagement: 4,  status: 'Active' },
]

export const mockHotSheets: HotSheet[] = [
  { id: 'hs1', label: 'Upcoming Open House', count: 768, newToday: 12 },
  { id: 'hs2', label: 'Back on Market',      count: 20,  newToday: 3  },
  { id: 'hs3', label: 'Price Reduced',       count: 120, newToday: 8  },
  { id: 'hs4', label: 'New Listings',        count: 2039,newToday: 47 },
]

export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'New Feature: AI Listing Boost',    body: 'Automatically promote your listings to matched buyers using AI.',          date: 'Today',      read: false },
  { id: 'n2', title: 'Webinar: AI for Revenue Growth',   body: 'Learn how to leverage AI for more efficient revenue generation.',           date: 'Yesterday',  read: false },
  { id: 'n3', title: 'New Listing Available in Your Area', body: '3 BD / 3 BA, 115 Appian #97, Irvine, CA 92602 — $1.2M. Act fast!',      date: '2 days ago', read: true  },
]