/**
 * Provider Portal — Core data model entities and enums.
 * Aligns with: Referral, Benefit Assignment, Session, Claim, etc.
 */

// ----- Enums -----

export type ReferralStatus =
  | 'New'
  | 'In Progress'
  | 'Accepted'
  | 'Completed'
  | 'Closed'

export type BenefitAssignmentStatus = 'Not Started' | 'Started' | 'Completed'

export type AttendanceStatus = 'Planned' | 'Delivered' | 'Attended' | 'Missed' | 'Cancelled'

export type ScheduleStatus = 'Draft' | 'Approved' | 'Archived'

export type ClaimStatus =
  | 'Draft'
  | 'Submitted'
  | 'In Adjudication'
  | 'Approved'
  | 'Paid'
  | 'Disputed'
  | 'Rejected'

// ----- Entities -----

export interface User {
  id: string
  name: string
  email: string
  role: string
  providerId: string
}

export interface Client {
  id: string
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  [key: string]: unknown
}

export interface Referral {
  id: string
  referralTitle: string
  clientId: string
  client?: Client
  service: string
  referralDate: string
  referredBy: string
  referredToUserId?: string
  priority: string
  status: ReferralStatus
  description?: string
  lastUpdated: string
  createdAt: string
}

export interface Benefit {
  id: string
  name: string
  code?: string
}

export interface BenefitAssignment {
  id: string
  enrolleeId: string
  enrollee?: Client
  benefitId: string
  benefit?: Benefit
  status: BenefitAssignmentStatus
  acceptanceDate: string
  startDate: string
  endDate: string
  lastUpdated: string
}

export interface BenefitSchedule {
  id: string
  scheduleName: string
  benefitId: string
  benefit?: Benefit
  startDate: string
  endDate: string
  capacity: number
  status: ScheduleStatus
  lastUpdated: string
}

export interface Session {
  id: string
  sessionName: string
  serviceType: string
  startDateTime: string
  endDateTime: string
  providerUserId: string
  benefitAssignmentId: string
  benefitScheduleId?: string
  quantity: number
  quantityUnit: string
  attendanceStatus: AttendanceStatus
  deliveryStatus: 'Scheduled' | 'Delivered'
  claimStatus: 'Not Yet Claimed' | 'Claimed'
  claimLineItemId?: string
  lastUpdated: string
}

export interface AttendanceRecord {
  id: string
  sessionId: string
  status: AttendanceStatus
  recordedAt: string
  recordedByUserId: string
}

export interface ActivityPost {
  id: string
  entityType: 'referral' | 'benefit_assignment' | 'claim' | 'session'
  entityId: string
  authorUserId: string
  authorName: string
  type: 'update' | 'question' | 'share' | 'comment'
  content: string
  createdAt: string
  attachments?: DocumentRef[]
  parentId?: string
}

export interface DocumentRef {
  id: string
  name: string
  documentId: string
  mimeType?: string
}

export interface Document {
  id: string
  name: string
  mimeType: string
  size?: number
  uploadedAt: string
  uploadedByUserId: string
  entityType?: string
  entityId?: string
}

export interface ClaimLineItem {
  id: string
  claimId: string
  sessionId: string
  session?: Session
  serviceDate: string
  clientId: string
  serviceType: string
  quantity: number
  rate: number
  lineTotal: number
}

export interface Claim {
  id: string
  providerId: string
  dateRangeStart: string
  dateRangeEnd: string
  totalAmount: number
  invoiceReferenceNumber?: string
  invoiceDocumentId?: string
  status: ClaimStatus
  submittedDate?: string
  adjudicationNotes?: string
  paymentTransactionId?: string
  lineItems: ClaimLineItem[]
  lastUpdated: string
}

export interface PaymentTransaction {
  id: string
  claimId: string
  amount: number
  erpReferenceId: string
  paidAt: string
}
