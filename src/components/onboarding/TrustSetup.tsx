import type { UserProfile, TrustLevel } from '../../types'

const trustItems: { key: keyof UserProfile['trustLevels']; label: string; desc: string }[] = [
  { key: 'followUps', label: 'Follow-up emails & texts', desc: 'Automated nurture sequences to leads' },
  { key: 'messages', label: 'Personalized messages', desc: 'Custom messages for high-value leads' },
  { key: 'listings', label: 'Listing promotions', desc: 'Boost listings and match buyers' },
  { key: 'negotiations', label: 'Negotiation suggestions', desc: 'Counter-offer and pricing advice' },
]

const levels: { value: TrustLevel; label: string; color: string; desc: string }[] = [
  { value: 'auto', label: 'Auto', color: 'bg-green-500/20 border-green-500/40 text-green-400', desc: 'AI acts without asking' },
  { value: 'approval', label: 'Ask me', color: 'bg-amber-500/20 border-amber-500/40 text-amber-400', desc: 'AI drafts, you approve' },
  { value: 'manual', label: 'Manual', color: 'bg-gray-500/20 border-gray-500/40 text-gray-400', desc: 'You do it yourself' },
]

interface Props {
  trustLevels: UserProfile['trustLevels']
  onChange: (levels: UserProfile['trustLevels']) => void
}

export default function TrustSetup({ trustLevels, onChange }: Props) {
  function setLevel(key: keyof UserProfile['trustLevels'], value: TrustLevel) {
    onChange({ ...trustLevels, [key]: value })
  }

  return (
    <div className="space-y-3">
      {trustItems.map((item) => (
        <div key={item.key} className="bg-lofty-surface border border-lofty-border rounded-xl p-4">
          <div className="mb-3">
            <div className="text-sm font-medium">{item.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
          </div>
          <div className="flex gap-2">
            {levels.map((lvl) => (
              <button
                key={lvl.value}
                onClick={() => setLevel(item.key, lvl.value)}
                className={`flex-1 py-1.5 px-2 rounded-lg border text-xs font-medium transition-all ${
                  trustLevels[item.key] === lvl.value
                    ? lvl.color
                    : 'border-lofty-border text-gray-600 hover:text-gray-400'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="flex gap-4 pt-1 px-1">
        {levels.map((lvl) => (
          <div key={lvl.value} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${lvl.value === 'auto' ? 'bg-green-400' : lvl.value === 'approval' ? 'bg-amber-400' : 'bg-gray-500'}`} />
            <span className="text-xs text-gray-500">{lvl.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}