import type { BenefitSchedule } from '../types/entities'

export const mockBenefitSchedules: BenefitSchedule[] = [
  {
    id: 'SCH-001',
    scheduleName: 'Counseling Q1 2025',
    benefitId: 'B1',
    startDate: '2025-01-06',
    endDate: '2025-03-28',
    capacity: 20,
    status: 'Approved',
    lastUpdated: '2025-01-05T10:00:00Z',
  },
  {
    id: 'SCH-002',
    scheduleName: 'Transportation Feb 2025',
    benefitId: 'B2',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    capacity: 50,
    status: 'Approved',
    lastUpdated: '2025-01-28T14:00:00Z',
  },
]
