import { Link } from 'react-router-dom'
import { PORTAL_PATHS } from '../../config/portalRoutes'
import { mockClaims } from '../../data/mockClaims'
import type { ClaimStatus } from '../../types/entities'
import styles from './ClaimsDashboardPage.module.css'

const statusClass: Record<ClaimStatus, string> = {
  Draft: styles.statusDraft,
  Submitted: styles.statusSubmitted,
  'In Adjudication': styles.statusSubmitted,
  Approved: styles.statusApproved,
  Paid: styles.statusPaid,
  Disputed: styles.statusDisputed,
  Rejected: styles.statusRejected,
}

export function ClaimsDashboardPage() {
  const claims = mockClaims
  const pending = claims.filter(
    (c) => ['Submitted', 'In Adjudication'].includes(c.status)
  ).length
  const approved = claims.filter((c) => c.status === 'Approved').length
  const paid = claims.filter((c) => c.status === 'Paid').length
  const disputed = claims.filter((c) => c.status === 'Disputed').length

  return (
    <div className={styles.page}>
      <nav className={styles.subNav} aria-label="Claims sections">
        <Link to={PORTAL_PATHS.claims} className={styles.subNavActive}>Dashboard</Link>
        <Link to={PORTAL_PATHS.claimsUnclaimed} className={styles.subNavLink}>Unclaimed Services</Link>
      </nav>
      <div className={styles.summary}>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{pending}</span>
          <span className={styles.metricLabel}>Total Pending</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{approved}</span>
          <span className={styles.metricLabel}>Approved</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{paid}</span>
          <span className={styles.metricLabel}>Paid</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{disputed}</span>
          <span className={styles.metricLabel}>Disputed</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Link to={PORTAL_PATHS.claimsUnclaimed} className="btn btn-primary">
          Create claim from unclaimed services
        </Link>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Submission Date</th>
              <th>Invoice Reference Number</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {claims.map((c) => (
              <tr key={c.id}>
                <td>
                  <Link to={PORTAL_PATHS.claimDetail(c.id)} className="link">
                    {c.id}
                  </Link>
                </td>
                <td>{c.submittedDate ? new Date(c.submittedDate).toLocaleDateString() : '—'}</td>
                <td>{c.invoiceReferenceNumber ?? '—'}</td>
                <td>${c.totalAmount.toFixed(2)}</td>
                <td>
                  <span className={`${styles.statusBadge} ${statusClass[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  {c.status === 'Paid' && c.paymentTransactionId && (
                    <Link to={`/payments/${c.paymentTransactionId}`} className="link">
                      Payment
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
