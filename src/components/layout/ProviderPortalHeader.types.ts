/**
 * Provider Portal Global Header – props and data inputs.
 * Reusable across all authenticated pages; independent from page-level logic.
 */

export interface CurrentUser {
  id: string
  name: string
  avatarUrl?: string | null
}

export interface ProviderPortalHeaderProps {
  /** Logged-in user context */
  currentUser: CurrentUser
  /** Current route path for active nav (e.g. from useLocation().pathname) */
  activeRoute: string
  /** Unread notifications count for badge */
  notificationCount?: number
  /** Callback when user submits search (supports debounce + Enter) */
  onSearch?: (query: string) => void
  /** Callback when user chooses Logout */
  onLogout?: () => void
  /** Optional: search loading state for spinner/disabled */
  searchLoading?: boolean
}
