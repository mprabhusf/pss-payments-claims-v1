import { useState, useMemo } from 'react'
import { mockBenefitSchedules } from '../../data/mockSchedules'
import { mockBenefits } from '../../data/mockBenefitAssignments'
import { DataTable } from '../../components/portal/DataTable'
import type { BenefitSchedule } from '../../types/entities'
import styles from './ReferralListPage.module.css'

function benefitName(schedule: BenefitSchedule): string {
  return mockBenefits.find((b) => b.id === schedule.benefitId)?.name ?? schedule.benefitId
}

export function SchedulesPage() {
  const [schedules] = useState<BenefitSchedule[]>(mockBenefitSchedules)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    if (!search.trim()) return schedules
    const q = search.toLowerCase()
    return schedules.filter(
      (s) =>
        s.scheduleName.toLowerCase().includes(q) ||
        benefitName(s).toLowerCase().includes(q)
    )
  }, [schedules, search])

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
    else setSelected(new Set(filtered.map((s) => s.id)))
  }

  return (
    <div className={styles.page}>
      <div className={styles.bulkActions} style={{ marginBottom: 'var(--space-4)' }}>
        <button type="button" className="btn btn-primary">Create new schedule</button>
      </div>
      <DataTable<BenefitSchedule>
        searchPlaceholder="Search schedules…"
        searchValue={search}
        onSearchChange={setSearch}
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
                aria-label={`Select ${row.scheduleName}`}
              />
            ),
          },
          { id: 'scheduleName', header: 'Schedule Name', cell: (row) => row.scheduleName },
          { id: 'benefit', header: 'Related Benefit', cell: (row) => benefitName(row) },
          {
            id: 'startDate',
            header: 'Start Date',
            cell: (row) => new Date(row.startDate).toLocaleDateString(),
          },
          {
            id: 'endDate',
            header: 'End Date',
            cell: (row) => new Date(row.endDate).toLocaleDateString(),
          },
          { id: 'capacity', header: 'Capacity', cell: (row) => row.capacity },
          { id: 'status', header: 'Status', cell: (row) => row.status },
        ]}
        rows={filtered}
        getRowId={(row) => row.id}
        bulkActions={
          selected.size > 0 ? (
            <div className={styles.bulkActions}>
              <span>{selected.size} selected</span>
              <button type="button" className="btn btn-secondary">Edit</button>
              <button type="button" className="btn btn-secondary">Bulk action</button>
            </div>
          ) : null
        }
      />
    </div>
  )
}
