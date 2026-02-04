import { useEffect, useState } from 'react'
import { SummaryCard } from '../components/ui/SummaryCard'
import { useActionBar } from '../context/ActionBarContext'

export function HouseholdInfo() {
  const { setActionBar } = useActionBar()
  const [members, setMembers] = useState([{ id: '1', name: 'Radhika Madan', relationship: 'Self' }])

  useEffect(() => {
    setActionBar({
      primaryLabel: 'Next',
      primaryTo: '/income',
      previousTo: '/applicant-info',
      showSave: true,
    })
  }, [setActionBar])

  const addMember = () => {
    setMembers((m) => [...m, { id: String(Date.now()), name: '', relationship: '' }])
  }

  return (
    <div>
      <p className="helper-text" style={{ marginBottom: 'var(--space-4)' }}>
        List everyone who lives with you and will be included on this application.
      </p>
      {members.map((member) => (
        <SummaryCard
          key={member.id}
          title={member.name || 'Household member'}
          summary={
            <>
              {member.relationship && <span>Relationship: {member.relationship}</span>}
            </>
          }
          onEdit={() => {}}
          onDelete={() => setMembers((m) => m.filter((x) => x.id !== member.id))}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div>
              <label className="field-label">Full name</label>
              <input className="input" defaultValue={member.name} placeholder="Full name" />
            </div>
            <div>
              <label className="field-label">Relationship to applicant</label>
              <select className="select">
                <option>Self</option>
                <option>Spouse</option>
                <option>Child</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </SummaryCard>
      ))}
      <button type="button" className="btn btn-secondary" onClick={addMember}>
        + New household member
      </button>
    </div>
  )
}
