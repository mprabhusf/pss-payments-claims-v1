/**
 * Placeholder contract-rate calculation.
 * In production, rates come from provider–benefit contracts.
 */

export interface RateRule {
  serviceType: string
  unit: string
  ratePerUnit: number
}

const PLACEHOLDER_RATES: RateRule[] = [
  { serviceType: 'Counseling', unit: 'Hour', ratePerUnit: 75 },
  { serviceType: 'Transportation', unit: 'Trip', ratePerUnit: 25 },
  { serviceType: 'Meal Delivery', unit: 'Meal', ratePerUnit: 12 },
]

export function getRateForService(serviceType: string, _quantityUnit?: string): number {
  const rule = PLACEHOLDER_RATES.find(
    (r) => r.serviceType.toLowerCase() === serviceType.toLowerCase()
  )
  return rule?.ratePerUnit ?? 50
}

export function calculateLineTotal(serviceType: string, quantity: number): number {
  const rate = getRateForService(serviceType)
  return Math.round(rate * quantity * 100) / 100
}

export function calculateClaimTotal(
  items: { serviceType: string; quantity: number }[]
): number {
  return items.reduce((sum, item) => sum + calculateLineTotal(item.serviceType, item.quantity), 0)
}
