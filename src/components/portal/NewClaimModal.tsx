import { useState } from 'react'
import type { Session } from '../../types/entities'
import { calculateLineTotal } from '../../lib/contractRates'
import { mockBenefitAssignments } from '../../data/mockBenefitAssignments'
import { mockClients } from '../../data/mockReferrals'
import styles from './NewClaimModal.module.css'

function clientName(session: Session): string {
  const assignment = mockBenefitAssignments.find((a) => a.id === session.benefitAssignmentId)
  if (!assignment) return '—'
  const client = mockClients.find((c) => c.id === assignment.enrolleeId)
  return client ? [client.firstName, client.lastName].join(' ') : assignment.enrolleeId
}

interface NewClaimModalProps {
  open: boolean
  onClose: () => void
  dateRange: string
  totalAmount: number
  selectedSessions: Session[]
  onSubmit: () => void
}

export function NewClaimModal({
  open,
  onClose,
  dateRange,
  totalAmount,
  selectedSessions,
  onSubmit,
}: NewClaimModalProps) {
  const [comments, setComments] = useState('')
  const [, setInvoiceFile] = useState<File | null>(null)

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="new-claim-title">
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 id="new-claim-title">New Claim for {dateRange}</h2>
          <p className={styles.total}>Total calculated amount: ${totalAmount.toFixed(2)}</p>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.body}>
          <section className={styles.section}>
            <h3 className="section-title">Selected Services Summary</h3>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date of Service</th>
                    <th>Constituent Name</th>
                    <th>Service Type</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSessions.map((s) => (
                    <tr key={s.id}>
                      <td>{new Date(s.startDateTime).toLocaleDateString()}</td>
                      <td>{clientName(s)}</td>
                      <td>{s.serviceType}</td>
                      <td>{s.quantity} {s.quantityUnit}</td>
                      <td>${calculateLineTotal(s.serviceType, s.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.section}>
            <label className="field-label" htmlFor="invoice-upload">
              Attach Provider Invoice (PDF)
            </label>
            <input
              id="invoice-upload"
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => setInvoiceFile(e.target.files?.[0] ?? null)}
              required
              className={styles.fileInput}
            />
          </section>

          <section className={styles.section}>
            <label className="field-label" htmlFor="comments">
              Comments (notes to adjudicator)
            </label>
            <textarea
              id="comments"
              className="textarea"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Optional"
              rows={3}
            />
          </section>

          <div className={styles.actions}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
