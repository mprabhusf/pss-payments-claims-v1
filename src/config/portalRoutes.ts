/**
 * Provider Portal — top-level and section routes.
 * Used for nav, breadcrumbs, and layout.
 */

export const PORTAL_PATHS = {
  home: '/',
  referrals: '/',
  referralDetail: (id: string) => `/referrals/${id}`,
  clients: '/clients',
  clientDetail: (id: string) => `/clients/${id}`,
  schedules: '/schedules',
  attendance: '/attendance',
  claims: '/claims',
  claimsUnclaimed: '/claims/unclaimed',
  claimDetail: (id: string) => `/claims/${id}`,
} as const

export const TOP_NAV = [
  { label: 'Home', path: PORTAL_PATHS.home },
  { label: 'Applications', path: PORTAL_PATHS.clients },
  { label: 'Schedules', path: PORTAL_PATHS.schedules },
  { label: 'Attendance', path: PORTAL_PATHS.attendance },
  { label: 'Claims', path: PORTAL_PATHS.claims },
] as const
