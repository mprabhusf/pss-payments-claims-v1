import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { ReferralListPage } from './pages/portal/ReferralListPage'
import { ReferralDetailPage } from './pages/portal/ReferralDetailPage'
import { ClientsPage } from './pages/portal/ClientsPage'
import { BenefitAssignmentDetailPage } from './pages/portal/BenefitAssignmentDetailPage'
import { SchedulesPage } from './pages/portal/SchedulesPage'
import { AttendancePage } from './pages/portal/AttendancePage'
import { ClaimsDashboardPage } from './pages/portal/ClaimsDashboardPage'
import { UnclaimedServicesPage } from './pages/portal/UnclaimedServicesPage'
import { ClaimDetailPage } from './pages/portal/ClaimDetailPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ReferralListPage />} />
        <Route path="referrals/:id" element={<ReferralDetailPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="clients/:id" element={<BenefitAssignmentDetailPage />} />
        <Route path="schedules" element={<SchedulesPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="claims" element={<ClaimsDashboardPage />} />
        <Route path="claims/unclaimed" element={<UnclaimedServicesPage />} />
        <Route path="claims/:id" element={<ClaimDetailPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return <AppRoutes />
}
