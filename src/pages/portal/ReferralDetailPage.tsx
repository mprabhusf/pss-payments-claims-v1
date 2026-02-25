import { useParams } from 'react-router-dom'
import { mockReferrals } from '../../data/mockReferrals'
import { mockClients } from '../../data/mockReferrals'
import { ActivityFeed } from '../../components/portal/ActivityFeed'
import styles from './ReferralDetailPage.module.css'

export function ReferralDetailPage() {
  const { id } = useParams()
  const referral = mockReferrals.find((r) => r.id === id)
  const client = referral ? mockClients.find((c) => c.id === referral.clientId) : null

  if (!referral) {
    return (
      <div className="card">
        <p>Referral not found.</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerCard}>
        <div className={styles.headerMeta}>
          <span><strong>Referral ID</strong> {referral.id}</span>
          <span><strong>Referral Title</strong> {referral.referralTitle}</span>
          <span><strong>Referred By</strong> {referral.referredBy}</span>
          <span><strong>Priority</strong> {referral.priority}</span>
          <span><strong>Status</strong> {referral.status}</span>
          <span><strong>Referral Date</strong> {new Date(referral.referralDate).toLocaleDateString()}</span>
        </div>
        <div className={styles.primaryAction}>
          <button type="button" className="btn btn-primary">Accept referral</button>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Referral Details</h2>
        <dl className={styles.dl}>
          <dt>Referral Title</dt><dd>{referral.referralTitle}</dd>
          <dt>Referral ID</dt><dd>{referral.id}</dd>
          <dt>Referral Date</dt><dd>{new Date(referral.referralDate).toLocaleDateString()}</dd>
          <dt>Referral Priority</dt><dd>{referral.priority}</dd>
          <dt>Referred To</dt><dd>Provider User</dd>
          <dt>Referrer</dt><dd>{referral.referredBy}</dd>
          <dt>Referral Status</dt><dd>{referral.status}</dd>
          <dt>Description</dt><dd>{referral.description ?? '—'}</dd>
        </dl>
      </div>

      <div className="card">
        <h2 className="section-title">Client Details</h2>
        <dl className={styles.dl}>
          <dt>First Name</dt><dd>{client?.firstName ?? '—'}</dd>
          <dt>Middle Name</dt><dd>{client?.middleName ?? '—'}</dd>
          <dt>Last Name</dt><dd>{client?.lastName ?? '—'}</dd>
          <dt>Date of Birth</dt><dd>{client?.dateOfBirth ? new Date(client.dateOfBirth).toLocaleDateString() : '—'}</dd>
        </dl>
      </div>

      <ActivityFeed
        entityType="referral"
        entityId={referral.id}
        posts={[]}
      />
    </div>
  )
}
