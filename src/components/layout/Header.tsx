import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo} aria-hidden>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="6" fill="var(--color-primary)" />
            <path d="M8 10h16v2H8V10zm0 5h12v2H8v-2zm0 5h10v2H8v-2z" fill="white" />
          </svg>
        </div>
        <span className={styles.appName}>National Benefits</span>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/applicant-info" className={styles.navLinkActive}>Applications</Link>
        <Link to="/eligible-benefits" className={styles.navLink}>Benefits</Link>
      </nav>
      <div className={styles.right}>
        <input
          type="search"
          className={styles.search}
          placeholder="Search…"
          aria-label="Search"
        />
        <button type="button" className={styles.iconBtn} aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <div className={styles.avatar} title="Radhika Madan">
          <span>RM</span>
        </div>
      </div>
    </header>
  )
}
