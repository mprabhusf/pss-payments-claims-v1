import { useState, useMemo } from 'react'
import { mockSessions } from '../../data/mockSessions'
import { mockBenefitAssignments } from '../../data/mockBenefitAssignments'
import { mockClients } from '../../data/mockReferrals'
import { DataTable } from '../../components/portal/DataTable'
import type { Session } from '../../types/entities'
import styles from './ReferralListPage.module.css'

function clientName(session: Session): string {
  const assignment = mockBenefitAssignments.find((a) => a.id === session.benefitAssignmentId)
  if (!assignment) return '—'
  const client = mockClients.find((c) => c.id === assignment.enrolleeId)
  return client ? [client.firstName, client.lastName].join(' ') : assignment.enrolleeId
}

export function AttendancePage() {
  const [sessions] = useState<Session[]>(mockSessions)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return sessions
    const q = search.toLowerCase()
    return sessions.filter(
      (s) =>
        s.sessionName.toLowerCase().includes(q) ||
        s.serviceType.toLowerCase().includes(q) ||
        clientName(s).toLowerCase().includes(q)
    )
  }, [sessions, search])

  return (
    <div className={styles.page}>
      <DataTable<Session>
        searchPlaceholder="Search sessions…"
        searchValue={search}
        onSearchChange={setSearch}
        columns={[
          { id: 'sessionName', header: 'Session Name', cell: (row) => row.sessionName },
          { id: 'serviceType', header: 'Service Type', cell: (row) => row.serviceType },
          {
            id: 'start',
            header: 'Start Date Time',
            cell: (row) => new Date(row.startDateTime).toLocaleString(),
          },
          {
            id: 'end',
            header: 'End Date Time',
            cell: (row) => new Date(row.endDateTime).toLocaleString(),
          },
          { id: 'quantity', header: 'Quantity', cell: (row) => `${row.quantity} ${row.quantityUnit}` },
          { id: 'attendanceStatus', header: 'Attendance Status', cell: (row) => row.attendanceStatus },
        ]}
        rows={filtered}
        getRowId={(row) => row.id}
      />
    </div>
  )
}
