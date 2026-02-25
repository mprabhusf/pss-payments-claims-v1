import { useState, useMemo } from 'react'
import { mockSessions } from '../../data/mockSessions'
import { mockBenefitAssignments } from '../../data/mockBenefitAssignments'
import { mockClients } from '../../data/mockReferrals'
import { filterUnclaimedSessions } from '../../lib/unclaimedEligibility'
import { calculateClaimTotal } from '../../lib/contractRates'
import { NewClaimModal } from '../../components/portal/NewClaimModal'
import type { Session } from '../../types/entities'
import styles from './UnclaimedServicesPage.module.css'

function clientName(session: Session): string {
  const assignment = mockBenefitAssignments.find((a) => a.id === session.benefitAssignmentId)
  if (!assignment) return '—'
  const client = mockClients.find((c) => c.id === assignment.enrolleeId)
  return client ? [client.firstName, client.lastName].join(' ') : assignment.enrolleeId
}

export function UnclaimedServicesPage() {
  const allSessions = useMemo(() => filterUnclaimedSessions(mockSessions), [])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [modalOpen, setModalOpen] = useState(false)

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selected.size === allSessions.length) setSelected(new Set())
    else setSelected(new Set(allSessions.map((s) => s.id)))
  }

  const selectedSessions = useMemo(
    () => allSessions.filter((s) => selected.has(s.id)),
    [allSessions, selected]
  )
  const totalAmount = useMemo(
    () => calculateClaimTotal(selectedSessions.map((s) => ({ serviceType: s.serviceType, quantity: s.quantity }))),
    [selectedSessions]
  )

  const dateRange =
    selectedSessions.length > 0
      ? `${new Date(Math.min(...selectedSessions.map((s) => new Date(s.startDateTime).getTime()))).toLocaleDateString()} – ${new Date(Math.max(...selectedSessions.map((s) => new Date(s.startDateTime).getTime()))).toLocaleDateString()}`
      : ''

  return (
    <div className={styles.page}>
      <p className={styles.intro}>
        Select delivered and attended sessions that are not yet claimed to create a reimbursement claim.
      </p>
      <div className={styles.toolbar}>
        {selected.size > 0 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            Create Claim from Selection ({selected.size} services)
          </button>
        )}
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxCell}>
                <input
                  type="checkbox"
                  checked={allSessions.length > 0 && selected.size === allSessions.length}
                  onChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </th>
              <th>Date of Service</th>
              <th>Constituent Name</th>
              <th>Service Type</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allSessions.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  No unclaimed services. Only sessions marked Delivered + Attended appear here.
                </td>
              </tr>
            )}
            {allSessions.map((s) => (
              <tr key={s.id}>
                <td className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={selected.has(s.id)}
                    onChange={() => toggleSelect(s.id)}
                    aria-label={`Select ${s.sessionName}`}
                  />
                </td>
                <td>{new Date(s.startDateTime).toLocaleDateString()}</td>
                <td>{clientName(s)}</td>
                <td>{s.serviceType}</td>
                <td>{s.quantity} {s.quantityUnit}</td>
                <td>{s.deliveryStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewClaimModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        dateRange={dateRange}
        totalAmount={totalAmount}
        selectedSessions={selectedSessions}
        onSubmit={() => {
          setModalOpen(false)
          setSelected(new Set())
        }}
      />
    </div>
  )
}
