import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockBenefitAssignments } from '../../data/mockBenefitAssignments'
import { mockClients } from '../../data/mockReferrals'
import { mockBenefits } from '../../data/mockBenefitAssignments'
import { mockSessions } from '../../data/mockSessions'
import { ActivityFeed } from '../../components/portal/ActivityFeed'
import styles from './BenefitAssignmentDetailPage.module.css'

const TABS = ['Details', 'Benefit Disbursement', 'Documents', 'Activity'] as const

export function BenefitAssignmentDetailPage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Details')
  const assignment = mockBenefitAssignments.find((a) => a.id === id)
  const enrollee = assignment ? mockClients.find((c) => c.id === assignment.enrolleeId) : null
  const benefit = assignment ? mockBenefits.find((b) => b.id === assignment.benefitId) : null
  const sessions = assignment ? mockSessions.filter((s) => s.benefitAssignmentId === assignment.id) : []

  if (!assignment) {
    return (
      <div className="card">
        <p>Benefit assignment not found.</p>
      </div>
    )
  }

  const enrolleeName = enrollee ? [enrollee.firstName, enrollee.lastName].join(' ') : assignment.enrolleeId
  const benefitName = benefit?.name ?? assignment.benefitId

  return (
    <div className={styles.page}>
      <div className={styles.headerCard}>
        <div className={styles.headerMeta}>
          <span><strong>Assignment ID</strong> {assignment.id}</span>
          <span><strong>Benefit Name</strong> {benefitName}</span>
          <span><strong>Enrollee Name</strong> {enrolleeName}</span>
          <span><strong>Status</strong> {assignment.status}</span>
          <span><strong>Start Date</strong> {new Date(assignment.startDate).toLocaleDateString()}</span>
          <span><strong>End Date</strong> {new Date(assignment.endDate).toLocaleDateString()}</span>
        </div>
      </div>

      <nav className={styles.tabs} aria-label="Sections">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab(tab)}
            aria-current={activeTab === tab ? 'true' : undefined}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === 'Details' && (
        <div className="card">
          <h2 className="section-title">Assignment Details</h2>
          <dl className={styles.dl}>
            <dt>Enrollee</dt><dd>{enrolleeName}</dd>
            <dt>Benefit</dt><dd>{benefitName}</dd>
            <dt>Status</dt><dd>{assignment.status}</dd>
            <dt>Acceptance Date</dt><dd>{new Date(assignment.acceptanceDate).toLocaleDateString()}</dd>
            <dt>Start / End</dt><dd>{new Date(assignment.startDate).toLocaleDateString()} – {new Date(assignment.endDate).toLocaleDateString()}</dd>
          </dl>
        </div>
      )}

      {activeTab === 'Benefit Disbursement' && (
        <div className="card">
          <h2 className="section-title">Sessions</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Session Name</th>
                  <th>Service Type</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Quantity</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id}>
                    <td>{s.sessionName}</td>
                    <td>{s.serviceType}</td>
                    <td>{new Date(s.startDateTime).toLocaleString()}</td>
                    <td>{new Date(s.endDateTime).toLocaleString()}</td>
                    <td>{s.quantity} {s.quantityUnit}</td>
                    <td>{s.attendanceStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Documents' && (
        <div className="card">
          <p className={styles.placeholder}>Documents section — upload and list documents.</p>
        </div>
      )}

      {activeTab === 'Activity' && (
        <ActivityFeed entityType="benefit_assignment" entityId={assignment.id} posts={[]} />
      )}
    </div>
  )
}
