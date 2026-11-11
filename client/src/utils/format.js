/**
 * Format a numeric amount in Philippine Pesos (e.g., "₱ 1,500.00").
 * Uses a non-breaking space after ₱ so the symbol never detaches from the amount.
 */
export function formatPHP(amount) {
  return `₱\u00A0${new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`
}

export const BADGE_STYLES = {
  Waterproof:   'bg-blue-50 text-blue-700 border border-blue-200/80',
  Ultralight:   'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
  Windproof:    'bg-sky-50 text-sky-700 border border-sky-200/80',
  Breathable:   'bg-teal-50 text-teal-700 border border-teal-200/80',
  'UV Protect': 'bg-amber-50 text-amber-700 border border-amber-200/80',
  Merino:       'bg-violet-50 text-violet-700 border border-violet-200/80',
  default:      'bg-gray-100 text-gray-700 border border-gray-200',
}

export const FREE_SHIPPING_THRESHOLD = 2000
