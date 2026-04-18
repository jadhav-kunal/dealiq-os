import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useUserStore } from './store/useUserStore'
import OnboardingFlow from './components/onboarding/OnboardingFlow'
import AdaptiveGrid from './components/workspace/AdaptiveGrid'

export default function App() {
  const profile = useUserStore((s) => s.profile)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-lofty-dark text-white">
        <Routes>
          <Route
            path="/"
            element={
              profile?.onboardingComplete
                ? <Navigate to="/workspace" replace />
                : <Navigate to="/onboarding" replace />
            }
          />
          <Route path="/onboarding" element={<OnboardingFlow />} />
          <Route
            path="/workspace"
            element={
              profile?.onboardingComplete
                ? <AdaptiveGrid />
                : <Navigate to="/onboarding" replace />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}