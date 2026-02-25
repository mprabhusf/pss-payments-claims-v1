import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PORTAL_PATHS } from '../../config/portalRoutes'
import { mockReferrals } from '../../data/mockReferrals'
import { HomeActivityPanel } from '../../components/portal/HomeActivityPanel'
import type { Referral } from '../../types/entities'
import styles from './ReferralListPage.module.css'

const clientNames: Record<string, string> = {
  C001: 'Maria Garcia',
  C002: 'James R. Wilson',
  C003: 'Yuki Tanaka',
  C004: 'Rob Marshal',
  C005: 'Susan Marshal',
  C006: 'Adolph Blaine Charles',
  C007: 'Justin Donin',
}

function formatReferralDate(s: string) {
  const d = new Date(s)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

export function ReferralListPage() {
  const [referrals] = useState<Referral[]>(mockReferrals)
  const [search, setSearch] = useState('')
  const [recentlyViewed, setRecentlyViewed] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [rowMenuOpen, setRowMenuOpen] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let list = referrals
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (r) =>
          (clientNames[r.clientId] ?? '').toLowerCase().includes(q) ||
          r.referralTitle.toLowerCase().includes(q) ||
          r.service.toLowerCase().includes(q)
      )
    }
    if (recentlyViewed) {
      list = list.filter((_, i) => i < 2)
    }
    return list
  }, [referrals, search, recentlyViewed])

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
    else setSelected(new Set(filtered.map((r) => r.id)))
  }

  const hasSelection = selected.size > 0

  return (
    <div className={styles.page} data-page="home-referrals">
      {/* Welcome Banner */}
      <section className={styles.welcomeBanner} aria-label="Welcome">
        <h2 className={styles.welcomeGreeting}>Welcome,</h2>
        <p className={styles.welcomeSubtext}>
          Work on referrals, manage calendar and mark attendance with the portal
        </p>
      </section>

      <div className={styles.twoColumn}>
        {/* Left: Referral Requests */}
        <div className={styles.mainColumn}>
          <section className={styles.referralSection} aria-labelledby="referral-requests-heading">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <h2 id="referral-requests-heading" className={styles.sectionTitle}>
                  Referral Requests
                </h2>
                <div className={styles.recentlyViewed}>
                  <button
                    type="button"
                    className={styles.dropdownTrigger}
                    aria-expanded={recentlyViewed}
                    aria-haspopup="listbox"
                    onClick={() => setRecentlyViewed(!recentlyViewed)}
                  >
                    Recently Viewed
                    <span className={styles.dropdownArrow} aria-hidden>▾</span>
                  </button>
                </div>
              </div>
              <div className={styles.statusLine}>
                {hasSelection && (
                  <span className={styles.statusItem}>{selected.size} Items Selected</span>
                )}
                <span className={styles.statusItem}>Updated 10 minutes ago</span>
              </div>
            </div>

            <div className={styles.searchAndActions}>
              <div className={styles.searchWrap}>
                <input
                  type="search"
                  className="input"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search referrals"
                />
              </div>
              {hasSelection && (
                <div className={styles.batchActions} role="toolbar" aria-label="Batch actions">
                  <button type="button" className={styles.actionIconBtn} title="Edit" aria-label="Edit">
                    <EditIcon />
                  </button>
                  <button type="button" className={styles.actionIconBtn} title="Delete" aria-label="Delete">
                    <DeleteIcon />
                  </button>
                  <button type="button" className={styles.actionIconBtn} title="Edit" aria-label="Edit">
                    <Edit2Icon />
                  </button>
                  <button type="button" className={styles.actionIconBtn} title="Download" aria-label="Download">
                    <DownloadIcon />
                  </button>
                  <button type="button" className={styles.actionIconBtn} title="Settings" aria-label="Settings">
                    <SettingsIcon />
                  </button>
                </div>
              )}
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.checkboxCol}>
                      <input
                        type="checkbox"
                        checked={filtered.length > 0 && selected.size === filtered.length}
                        onChange={toggleSelectAll}
                        aria-label="Select all rows"
                      />
                    </th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Service</th>
                    <th>Referral Date</th>
                    <th className={styles.actionsCol}></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id}>
                      <td className={styles.checkboxCol}>
                        <input
                          type="checkbox"
                          checked={selected.has(row.id)}
                          onChange={() => toggleSelect(row.id)}
                          aria-label={`Select ${clientNames[row.clientId] ?? row.clientId}`}
                        />
                      </td>
                      <td>
                        <Link to={PORTAL_PATHS.referralDetail(row.id)} className="link">
                          {clientNames[row.clientId] ?? row.clientId}
                        </Link>
                      </td>
                      <td>{row.referralTitle}</td>
                      <td>{row.service}</td>
                      <td>{formatReferralDate(row.referralDate)}</td>
                      <td className={styles.actionsCol}>
                        <div className={styles.rowMenuWrap}>
                          <button
                            type="button"
                            className={styles.ellipsisBtn}
                            aria-label="Row actions"
                            aria-expanded={rowMenuOpen === row.id}
                            onClick={() => setRowMenuOpen(rowMenuOpen === row.id ? null : row.id)}
                          >
                            ⋮
                          </button>
                          {rowMenuOpen === row.id && (
                            <div className={styles.rowMenu} role="menu">
                              <button type="button" role="menuitem">View</button>
                              <button type="button" role="menuitem">Edit</button>
                              <button type="button" role="menuitem">Assign</button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right: Activity Panel */}
        <div className={styles.sideColumn}>
          <HomeActivityPanel />
        </div>
      </div>
    </div>
  )
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function DeleteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  )
}

function Edit2Icon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}
