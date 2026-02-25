import { useParams } from 'react-router-dom'
import { mockClaims } from '../../data/mockClaims'
import { ActivityFeed } from '../../components/portal/ActivityFeed'
import styles from './ReferralDetailPage.module.css'

export function ClaimDetailPage() {
  const { id } = useParams()
  const claim = mockClaims.find((c) => c.id === id)

  if (!claim) {
    return (
      <div className="card">
        <p>Claim not found.</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerCard}>
        <div className={styles.headerMeta}>
          <span><strong>Claim ID</strong> {claim.id}</span>
          <span><strong>Status</strong> {claim.status}</span>
          <span><strong>Date Range</strong> {claim.dateRangeStart} – {claim.dateRangeEnd}</span>
          <span><strong>Total Amount</strong> ${claim.totalAmount.toFixed(2)}</span>
          <span><strong>Submitted</strong> {claim.submittedDate ?? '—'}</span>
          {claim.paymentTransactionId && (
            <span><strong>Payment</strong> <a href={`/payments/${claim.paymentTransactionId}`} className="link">View</a></span>
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Claim details</h2>
        <dl className={styles.dl}>
          <dt>Invoice Reference</dt><dd>{claim.invoiceReferenceNumber ?? '—'}</dd>
          <dt>Adjudication Notes</dt><dd>{claim.adjudicationNotes ?? '—'}</dd>
        </dl>
      </div>

      <ActivityFeed entityType="claim" entityId={claim.id} posts={[]} />
    </div>
  )
}
