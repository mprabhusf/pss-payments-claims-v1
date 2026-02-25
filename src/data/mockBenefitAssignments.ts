import type { BenefitAssignment, Benefit } from '../types/entities'

export const mockBenefits: Benefit[] = [
  { id: 'B1', name: 'Adult Counseling', code: 'COUN-AD' },
  { id: 'B2', name: 'Transportation', code: 'TRANS' },
  { id: 'B3', name: 'Nutrition Support', code: 'NUTR' },
]

export const mockBenefitAssignments: BenefitAssignment[] = [
  {
    id: 'BA-001',
    enrolleeId: 'C001',
    benefitId: 'B1',
    status: 'Started',
    acceptanceDate: '2025-02-05',
    startDate: '2025-02-10',
    endDate: '2025-05-10',
    lastUpdated: '2025-02-20T10:00:00Z',
  },
  {
    id: 'BA-002',
    enrolleeId: 'C002',
    benefitId: 'B2',
    status: 'Started',
    acceptanceDate: '2025-02-12',
    startDate: '2025-02-15',
    endDate: '2025-03-15',
    lastUpdated: '2025-02-18T14:30:00Z',
  },
]
