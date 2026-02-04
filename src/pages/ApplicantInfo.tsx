import { useEffect } from 'react'
import { DocumentCenter } from '../components/ui/DocumentCenter'
import { useActionBar } from '../context/ActionBarContext'

export function ApplicantInfo() {
  const { setActionBar } = useActionBar()

  useEffect(() => {
    setActionBar({
      primaryLabel: 'Next',
      primaryTo: '/household',
      previousTo: undefined,
      showSave: true,
    })
  }, [setActionBar])

  return (
    <div>
      <h3 className="section-title">Applicant Information</h3>
      <DocumentCenter
        title="Applicant ID"
        acceptedTypes="PDF, JPG, PNG (max 10MB)"
        uploadButtonLabel="Upload Document"
      />
      <div className="card" style={{ marginTop: 'var(--space-6)' }}>
        <h3 className="section-title">Personal details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          <div>
            <label className="field-label" htmlFor="first">First Name</label>
            <input id="first" className="input" placeholder="Enter legal first name" />
          </div>
          <div>
            <label className="field-label" htmlFor="middle">Middle Name</label>
            <input id="middle" className="input" placeholder="Middle name" />
          </div>
          <div>
            <label className="field-label" htmlFor="last">Last Name</label>
            <input id="last" className="input" placeholder="Enter legal last name" />
          </div>
          <div>
            <label className="field-label" htmlFor="suffix">Suffix</label>
            <select id="suffix" className="select">
              <option value="">None</option>
              <option>Jr.</option>
              <option>Sr.</option>
              <option>III</option>
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="ssn">Social Security Number</label>
            <input id="ssn" className="input" placeholder="XXX-XX-XXXX" />
          </div>
          <div>
            <label className="field-label" htmlFor="dob">Date of Birth</label>
            <input id="dob" type="date" className="input" />
          </div>
          <div>
            <label className="field-label" htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" className="input" placeholder="(555) 000-0000" />
          </div>
          <div>
            <label className="field-label" htmlFor="email">Email Address</label>
            <input id="email" type="email" className="input" placeholder="email@example.com" />
          </div>
          <div>
            <label className="field-label" htmlFor="gender">Gender</label>
            <select id="gender" className="select">
              <option value="">Select</option>
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="lang">Preferred Language</label>
            <select id="lang" className="select">
              <option>English</option>
              <option>Spanish</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>
      <div className="card">
        <h3 className="section-title">Contact preferences</h3>
        <div className="checkbox-group">
          <input type="checkbox" id="notifications" />
          <label htmlFor="notifications">Receive notifications via email/SMS</label>
        </div>
      </div>
    </div>
  )
}
