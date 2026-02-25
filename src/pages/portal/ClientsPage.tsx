import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PORTAL_PATHS } from '../../config/portalRoutes'
import { mockBenefitAssignments } from '../../data/mockBenefitAssignments'
import { mockClients } from '../../data/mockReferrals'
import { mockBenefits } from '../../data/mockBenefitAssignments'
import { DataTable } from '../../components/portal/DataTable'
import type { BenefitAssignment } from '../../types/entities'
import styles from './ReferralListPage.module.css'

function enrolleeName(assignment: BenefitAssignment): string {
  const client = mockClients.find((c) => c.id === assignment.enrolleeId)
  return client ? [client.firstName, client.lastName].join(' ') : assignment.enrolleeId
}

function benefitName(assignment: BenefitAssignment): string {
  return mockBenefits.find((b) => b.id === assignment.benefitId)?.name ?? assignment.benefitId
}

export function ClientsPage() {
  const [assignments] = useState<BenefitAssignment[]>(mockBenefitAssignments)
  const [search, setSearch] = useState('')
  const [recentlyViewed, setRecentlyViewed] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    let list = assignments
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (a) =>
          enrolleeName(a).toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q) ||
          benefitName(a).toLowerCase().includes(q)
      )
    }
    if (recentlyViewed) list = list.filter((_, i) => i < 2)
    return list
  }, [assignments, search, recentlyViewed])

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) setSelected(new Set())
    else setSelected(new Set(filtered.map((a) => a.id)))
  }

  const lastUpdated = assignments[0]?.lastUpdated
    ? new Date(assignments[0].lastUpdated).toLocaleString()
    : undefined

  return (
    <div className={styles.page}>
      <DataTable<BenefitAssignment>
        searchPlaceholder="Search by enrollee…"
        searchValue={search}
        onSearchChange={setSearch}
        showRecentlyViewedFilter
        recentlyViewedChecked={recentlyViewed}
        onRecentlyViewedChange={setRecentlyViewed}
        lastUpdated={lastUpdated}
        columns={[
          {
            id: 'select',
            header: (
              <input
                type="checkbox"
                checked={filtered.length > 0 && selected.size === filtered.length}
                onChange={toggleSelectAll}
                aria-label="Select all"
              />
            ),
            cell: (row) => (
              <input
                type="checkbox"
                checked={selected.has(row.id)}
                onChange={() => toggleSelect(row.id)}
                aria-label={`Select ${row.id}`}
              />
            ),
          },
          {
            id: 'enrolleeName',
            header: 'Enrollee Name',
            cell: (row) => (
              <Link to={PORTAL_PATHS.clientDetail(row.id)} className="link">
                {enrolleeName(row)}
              </Link>
            ),
          },
          { id: 'id', header: 'Benefit Assignment Record ID', cell: (row) => row.id },
          { id: 'benefit', header: 'Benefit', cell: (row) => benefitName(row) },
          { id: 'status', header: 'Status', cell: (row) => row.status },
          {
            id: 'acceptanceDate',
            header: 'Acceptance Date',
            cell: (row) => new Date(row.acceptanceDate).toLocaleDateString(),
          },
        ]}
        rows={filtered}
        getRowId={(row) => row.id}
        bulkActions={
          selected.size > 0 ? (
            <div className={styles.bulkActions}>
              <span>{selected.size} selected</span>
              <button type="button" className="btn btn-secondary">Bulk action</button>
            </div>
          ) : null
        }
      />
    </div>
  )
}
