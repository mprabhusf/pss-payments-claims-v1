import { useLocation, useParams } from 'react-router-dom'

export function usePortalPageTitle(): { title: string; subtitle?: string } {
  const location = useLocation()
  const params = useParams()
  const path = location.pathname

  if (path === '/') return { title: 'Referrals', subtitle: 'Referral Management' }
  if (path.startsWith('/referrals/')) return { title: 'Referral Details', subtitle: params.id }
  if (path === '/clients') return { title: 'Clients', subtitle: 'Benefit Assignments' }
  if (path.startsWith('/clients/')) return { title: 'Benefit Assignment', subtitle: params.id }
  if (path === '/schedules') return { title: 'Benefit Schedules', subtitle: '' }
  if (path === '/attendance') return { title: 'Attendance', subtitle: 'Session tracking' }
  if (path === '/claims/unclaimed') return { title: 'Unclaimed Services', subtitle: 'Create claim from selection' }
  if (path.startsWith('/claims/')) return { title: 'Claim Details', subtitle: params.id }
  if (path === '/claims') return { title: 'Claims', subtitle: 'Reimbursement dashboard' }
  return { title: 'Provider Hub', subtitle: '' }
}
