/**
 * REST API route constants for Provider Portal.
 * Replace base with actual API base URL in env.
 */

const BASE = '/api'

export const API = {
  // Referrals
  referrals: `${BASE}/referrals`,
  referralById: (id: string) => `${BASE}/referrals/${id}`,

  // Clients / Benefit Assignments
  benefitAssignments: `${BASE}/benefit-assignments`,
  benefitAssignmentById: (id: string) => `${BASE}/benefit-assignments/${id}`,

  // Schedules
  benefitSchedules: `${BASE}/benefit-schedules`,
  benefitScheduleById: (id: string) => `${BASE}/benefit-schedules/${id}`,

  // Sessions (disbursement / attendance)
  sessions: `${BASE}/sessions`,
  sessionById: (id: string) => `${BASE}/sessions/${id}`,
  sessionsByAssignment: (assignmentId: string) => `${BASE}/benefit-assignments/${assignmentId}/sessions`,

  // Unclaimed services (sessions eligible for claim)
  unclaimedServices: `${BASE}/sessions/unclaimed`,

  // Claims
  claims: `${BASE}/claims`,
  claimById: (id: string) => `${BASE}/claims/${id}`,
  submitClaim: (id: string) => `${BASE}/claims/${id}/submit`,

  // Activity
  activity: (entityType: string, entityId: string) => `${BASE}/activity/${entityType}/${entityId}`,
  activityPost: `${BASE}/activity`,

  // Documents
  documents: `${BASE}/documents`,
  documentById: (id: string) => `${BASE}/documents/${id}`,
  uploadDocument: `${BASE}/documents/upload`,

  // Payment (read-only from ERP)
  paymentById: (id: string) => `${BASE}/payments/${id}`,

  // Global search
  search: `${BASE}/search`,
} as const
