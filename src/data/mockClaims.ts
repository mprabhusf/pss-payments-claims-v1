import type { Claim } from '../types/entities'

export const mockClaims: Claim[] = [
  {
    id: 'CLM-2001',
    providerId: 'PROV-1',
    dateRangeStart: '2025-02-01',
    dateRangeEnd: '2025-02-15',
    totalAmount: 150,
    invoiceReferenceNumber: 'INV-001',
    status: 'Submitted',
    submittedDate: '2025-02-20',
    lineItems: [],
    lastUpdated: '2025-02-20T12:00:00Z',
  },
  {
    id: 'CLM-2002',
    providerId: 'PROV-1',
    dateRangeStart: '2025-01-15',
    dateRangeEnd: '2025-01-31',
    totalAmount: 325,
    invoiceReferenceNumber: 'INV-002',
    status: 'Paid',
    submittedDate: '2025-02-01',
    paymentTransactionId: 'PAY-001',
    lineItems: [],
    lastUpdated: '2025-02-18T09:00:00Z',
  },
]
