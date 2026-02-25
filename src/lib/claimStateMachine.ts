/**
 * Claim status lifecycle — transitions are auditable.
 * Status: Draft | Submitted | In Adjudication | Approved | Paid | Disputed | Rejected
 */

import type { ClaimStatus } from '../types/entities'

const TRANSITIONS: Record<ClaimStatus, ClaimStatus[]> = {
  Draft: ['Submitted'],
  Submitted: ['In Adjudication', 'Rejected'],
  'In Adjudication': ['Approved', 'Rejected', 'Disputed'],
  Approved: ['Paid'],
  Paid: [],
  Disputed: ['In Adjudication', 'Rejected'],
  Rejected: ['Draft'],
}

export function canTransitionClaim(from: ClaimStatus, to: ClaimStatus): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false
}

export function getNextAllowedStatuses(status: ClaimStatus): ClaimStatus[] {
  return TRANSITIONS[status] ?? []
}

export function isClaimLocked(status: ClaimStatus): boolean {
  return ['Submitted', 'In Adjudication', 'Approved', 'Paid', 'Disputed'].includes(status)
}

/** Rejected claims release sessions back to Unclaimed Services. */
export function releasesSessionsOnTransition(_from: ClaimStatus, to: ClaimStatus): boolean {
  return to === 'Rejected'
}
