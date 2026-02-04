import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Breadcrumbs } from './Breadcrumbs'
import { ApplicationHeader } from './ApplicationHeader'
import { LeftSectionNav } from './LeftSectionNav'
import { BottomActionBar } from './BottomActionBar'
import { FloatingAssistant } from './FloatingAssistant'
import { useActionBar } from '../../context/ActionBarContext'
import styles from './AppLayout.module.css'

export function AppLayout() {
  const location = useLocation()
  const actionBar = useActionBar()
  const isLanding = location.pathname === '/'
  const isConfirmation = location.pathname === '/confirmation'
  const showActionBar = !isLanding && !isConfirmation && actionBar.state.primaryLabel

  return (
    <>
      <Header />
      <main className={styles.main}>
        {!isLanding && (
          <div className={styles.breadcrumbWrap}>
            <div className={styles.breadcrumbInner}>
              <Breadcrumbs />
              {!isConfirmation && (
                <>
                  <h1 className="page-title">Public Benefits</h1>
                  <p className={styles.subtitle}>Application Form</p>
                </>
              )}
            </div>
          </div>
        )}
        <ApplicationHeader />
        <div className={styles.contentWrap}>
          <LeftSectionNav />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </main>
      {showActionBar && (
        <BottomActionBar
          primaryLabel={actionBar.state.primaryLabel}
          primaryTo={actionBar.state.primaryTo}
          onPrimaryClick={actionBar.state.onPrimaryClick}
          previousTo={actionBar.state.previousTo}
          showSave={actionBar.state.showSave}
          primaryDisabled={actionBar.state.primaryDisabled}
        />
      )}
      <Footer />
      <FloatingAssistant />
    </>
  )
}
