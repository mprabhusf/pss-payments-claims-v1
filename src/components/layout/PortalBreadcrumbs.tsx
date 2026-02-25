import { Link, useLocation, useParams } from 'react-router-dom'
import { PORTAL_PATHS } from '../../config/portalRoutes'
import styles from './Breadcrumbs.module.css'

function useBreadcrumbItems(): { label: string; path?: string }[] {
  const location = useLocation()
  const params = useParams()
  const path = location.pathname

  if (path === '/') return [{ label: 'Home' }]
  if (path.startsWith('/referrals/')) {
    const id = params.id ?? ''
    return [
      { label: 'Home', path: PORTAL_PATHS.home },
      { label: 'Referrals', path: PORTAL_PATHS.home },
      { label: id || 'Referral' },
    ]
  }
  if (path === '/clients') return [{ label: 'Home', path: PORTAL_PATHS.home }, { label: 'Clients' }]
  if (path.startsWith('/clients/')) {
    const id = params.id ?? ''
    return [
      { label: 'Home', path: PORTAL_PATHS.home },
      { label: 'Clients', path: PORTAL_PATHS.clients },
      { label: id || 'Client' },
    ]
  }
  if (path === '/schedules') return [{ label: 'Home', path: PORTAL_PATHS.home }, { label: 'Schedules' }]
  if (path === '/attendance') return [{ label: 'Home', path: PORTAL_PATHS.home }, { label: 'Attendance' }]
  if (path === '/claims') return [{ label: 'Home', path: PORTAL_PATHS.home }, { label: 'Claims' }]
  if (path === '/claims/unclaimed') {
    return [
      { label: 'Home', path: PORTAL_PATHS.home },
      { label: 'Claims', path: PORTAL_PATHS.claims },
      { label: 'Unclaimed Services' },
    ]
  }
  if (path.startsWith('/claims/')) {
    const id = params.id ?? ''
    return [
      { label: 'Home', path: PORTAL_PATHS.home },
      { label: 'Claims', path: PORTAL_PATHS.claims },
      { label: id || 'Claim' },
    ]
  }
  return [{ label: 'Home', path: PORTAL_PATHS.home }]
}

export function PortalBreadcrumbs() {
  const items = useBreadcrumbItems()
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      {items.map((item, i) => (
        <span key={i} className={styles.item}>
          {i > 0 && <span className={styles.sep}>/</span>}
          {item.path ? (
            <Link to={item.path} className={styles.link}>{item.label}</Link>
          ) : (
            <span className={styles.text}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
