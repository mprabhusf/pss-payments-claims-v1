import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'

export function LandingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Welcome, Radhika!</h2>
          <p className={styles.heroSubtitle}>
            Let&apos;s find the right benefits for you.
          </p>
        </div>
        <div className={styles.heroIllustration} aria-hidden>
          <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="240" height="160" rx="12" fill="var(--color-secondary)" />
            <circle cx="70" cy="70" r="22" fill="var(--color-primary-light)" />
            <circle cx="140" cy="65" r="20" fill="var(--color-primary-light)" />
            <circle cx="180" cy="75" r="18" fill="var(--color-primary-light)" />
            <path d="M55 110q10-15 30-15t30 15" stroke="var(--color-primary)" strokeWidth="3" fill="none" />
          </svg>
        </div>
      </section>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Benefit Assistance</h3>
          <p className={styles.cardDesc}>Apply for food, cash, health, and other benefits.</p>
          <Link to="/applicant-info" className="btn btn-primary">Apply for Benefits</Link>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Change of Circumstance</h3>
          <p className={styles.cardDesc}>Report changes to your household or income.</p>
          <button type="button" className="btn btn-secondary">Report Changes</button>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Workers Compensation</h3>
          <p className={styles.cardDesc}>File a workers compensation claim.</p>
          <button type="button" className="btn btn-secondary">File a Claim</button>
        </div>
      </div>
    </div>
  )
}
