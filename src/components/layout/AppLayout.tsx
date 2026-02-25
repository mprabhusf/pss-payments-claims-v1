import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ProviderPortalHeader } from './ProviderPortalHeader'
import { Footer } from './Footer'
import { PortalBreadcrumbs } from './PortalBreadcrumbs'
import { usePortalPageTitle } from '../../config/portalPageTitles'
import { FloatingAssistant } from './FloatingAssistant'
import styles from './AppLayout.module.css'

const DEFAULT_USER = {
  id: 'user-1',
  name: 'Amy Hoffman',
  avatarUrl: null as string | null,
}

export function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { title, subtitle } = usePortalPageTitle()

  const handleSearch = (query: string) => {
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  const handleLogout = () => {
    console.log('Logout requested')
  }

  return (
    <>
      <ProviderPortalHeader
        currentUser={DEFAULT_USER}
        activeRoute={location.pathname}
        notificationCount={3}
        onSearch={handleSearch}
        onLogout={handleLogout}
      />
      <main className={styles.main}>
        <div className={styles.breadcrumbWrap}>
          <div className={styles.breadcrumbInner}>
            <PortalBreadcrumbs />
            <h1 className="page-title">{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
        <div className={styles.contentWrap}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
      <FloatingAssistant />
    </>
  )
}
