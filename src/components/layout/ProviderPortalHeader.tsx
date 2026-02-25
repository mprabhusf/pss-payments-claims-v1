import { useState, useCallback, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TOP_NAV } from '../../config/portalRoutes'
import type { ProviderPortalHeaderProps } from './ProviderPortalHeader.types'
import styles from './ProviderPortalHeader.module.css'

const SEARCH_DEBOUNCE_MS = 300

export function ProviderPortalHeader({
  currentUser,
  activeRoute,
  notificationCount = 0,
  onSearch,
  onLogout,
  searchLoading = false,
}: ProviderPortalHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  const isActive = useCallback(
    (path: string) => {
      if (path === '/') return activeRoute === '/'
      return activeRoute.startsWith(path)
    },
    [activeRoute]
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (!onSearch) return
      debounceRef.current = setTimeout(() => {
        onSearch(value.trim())
        debounceRef.current = null
      }, SEARCH_DEBOUNCE_MS)
    },
    [onSearch]
  )

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
      onSearch?.(searchQuery.trim())
    },
    [onSearch, searchQuery]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        const input = e.currentTarget as HTMLInputElement
        if (input.form) input.form.requestSubmit()
      }
    },
    []
  )

  useEffect(() => {
    const closeMenus = (e: MouseEvent) => {
      if (
        userMenuRef.current?.contains(e.target as Node) ||
        notificationsRef.current?.contains(e.target as Node)
      )
        return
      setUserMenuOpen(false)
      setNotificationsOpen(false)
    }
    document.addEventListener('click', closeMenus)
    return () => document.removeEventListener('click', closeMenus)
  }, [])

  const initials = currentUser.name
    .split(/\s+/)
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className={styles.header} role="banner">
      {/* Left: Brand + Primary Navigation */}
      <div className={styles.left}>
        <Link to="/" className={styles.brand} aria-label="Provider Hub – Home">
          <span className={styles.logo} aria-hidden>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="6" fill="var(--color-primary)" />
              <path d="M8 10h16v2H8V10zm0 5h12v2H8v-2zm0 5h10v2H8v-2z" fill="white" />
            </svg>
          </span>
          <span className={styles.brandName}>Provider Hub</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          {TOP_NAV.map(({ label, path }) => {
            const active = isActive(path)
            return (
              <Link
                key={path}
                to={path}
                className={active ? styles.navLinkActive : styles.navLink}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            )
          })}
        </nav>
        <button
          type="button"
          className={styles.mobileNavTrigger}
          aria-expanded={navOpen}
          aria-label="Toggle menu"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span className={styles.hamburger} aria-hidden />
        </button>
      </div>

      {/* Center: Global Search */}
      <div className={styles.center}>
        <form role="search" className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <span className={styles.searchIcon} aria-hidden>
            <SearchIcon />
          </span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search…"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Global search (Applications, Clients, Schedules, Sessions, Claims)"
            disabled={searchLoading}
          />
          {searchLoading && (
            <span className={styles.searchSpinner} aria-hidden>
              <span className={styles.spinner} />
            </span>
          )}
        </form>
      </div>

      {/* Right: User Controls */}
      <div className={styles.right}>
        <div className={styles.notificationsWrap} ref={notificationsRef}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={notificationCount > 0 ? `${notificationCount} unread notifications` : 'Notifications'}
            aria-expanded={notificationsOpen}
            onClick={() => {
              setNotificationsOpen(!notificationsOpen)
              setUserMenuOpen(false)
            }}
          >
            <BellIcon />
            {notificationCount > 0 && (
              <span className={styles.badge} aria-hidden>
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>
          {notificationsOpen && (
            <div className={styles.panel} role="dialog" aria-label="Notifications">
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Notifications</h3>
              </div>
              <div className={styles.panelBody}>
                {notificationCount === 0 ? (
                  <p className={styles.panelEmpty}>No new notifications</p>
                ) : (
                  <ul className={styles.notificationList}>
                    <li className={styles.notificationItem}>
                      <span className={styles.notificationTitle}>Claim status update</span>
                      <span className={styles.notificationTime}>Recently</span>
                    </li>
                    <li className={styles.notificationItem}>
                      <span className={styles.notificationTitle}>Referral update</span>
                      <span className={styles.notificationTime}>1 hour ago</span>
                    </li>
                    <li className={styles.notificationItem}>
                      <span className={styles.notificationTitle}>Approval notification</span>
                      <span className={styles.notificationTime}>Yesterday</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.userBlock} ref={userMenuRef}>
          <button
            type="button"
            className={styles.userTrigger}
            aria-expanded={userMenuOpen}
            aria-haspopup="menu"
            onClick={() => {
              setUserMenuOpen(!userMenuOpen)
              setNotificationsOpen(false)
            }}
          >
            <span className={styles.avatar}>
              {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="" width={32} height={32} />
              ) : (
                initials
              )}
            </span>
            <span className={styles.userName}>{currentUser.name}</span>
            <span className={styles.dropdownArrow} aria-hidden>▾</span>
          </button>
          {userMenuOpen && (
            <div className={styles.panel} role="menu" aria-label="User menu">
              <div className={styles.panelBody}>
                <button type="button" className={styles.menuItem} role="menuitem">
                  Profile
                </button>
                <button type="button" className={styles.menuItem} role="menuitem">
                  Settings
                </button>
                <button
                  type="button"
                  className={styles.menuItem}
                  role="menuitem"
                  onClick={() => {
                    onLogout?.()
                    setUserMenuOpen(false)
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav overlay */}
      {navOpen && (
        <>
          <div
            className={styles.navOverlay}
            aria-hidden
            onClick={() => setNavOpen(false)}
          />
          <nav className={styles.mobileNav} aria-label="Primary navigation (mobile)">
            {TOP_NAV.map(({ label, path }) => {
              const active = isActive(path)
              return (
                <Link
                  key={path}
                  to={path}
                  className={active ? styles.mobileNavLinkActive : styles.mobileNavLink}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setNavOpen(false)}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </>
      )}
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
