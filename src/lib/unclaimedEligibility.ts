/**
 * Eligibility for Unclaimed Services list.
 * Only sessions with Attendance = Delivered + Attended and Claim Status = Not Yet Claimed
 * are eligible for reimbursement and appear in the list.
 */

import type { Session } from '../types/entities'

/** Only sessions marked as Delivered + Attended are eligible for reimbursement. */
export function isSessionEligibleForClaim(session: Session): boolean {
  const delivered = session.deliveryStatus === 'Delivered'
  const attended = session.attendanceStatus === 'Attended'
  const notClaimed = session.claimStatus === 'Not Yet Claimed'
  return delivered && attended && notClaimed
}

export function filterUnclaimedSessions(sessions: Session[]): Session[] {
  return sessions.filter(isSessionEligibleForClaim)
}
