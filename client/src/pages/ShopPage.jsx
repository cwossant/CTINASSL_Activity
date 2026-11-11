import { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import { ALL_PRODUCTS } from '../data/products'

const PRICE_RANGES = [
  { label: 'All Prices',      min: 0,     max: Infinity },
  { label: 'Under ₱ 2,000',  min: 0,     max: 1999 },
  { label: '₱ 2,000–5,000',  min: 2000,  max: 5000 },
  { label: '₱ 5,000–10,000', min: 5001,  max: 10000 },
  { label: '₱ 10,000+',      min: 10001, max: Infinity },
]

const WEIGHT_RANGES = [
  { label: 'Any Weight',  max: Infinity },
  { label: '< 200 g',    max: 199 },
  { label: '200–500 g',  max: 500 },
  { label: '500 g+',     max: Infinity, min: 500 },
]

const BADGE_OPTIONS = ['Waterproof', 'Ultralight', 'Windproof', 'Breathable', 'UV Protect', 'Merino']

const SORT_OPTIONS = [
  { label: 'Featured',    value: 'featured' },
  { label: 'Price: Low',  value: 'price-asc' },
  { label: 'Price: High', value: 'price-desc' },
  { label: 'Lightest',    value: 'weight-asc' },
]

function IconFilter() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/>
      <line x1="11" y1="18" x2="13" y2="18"/>
    </svg>
  )
}

function IconClose() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

/* ─── Filter Panel (shared between sidebar + drawer) ────────────────────── */
function FilterPanel({ filters, setFilters }) {
  const toggle = (key, val) =>
    setFilters((f) => ({ ...f, [key]: f[key] === val ? null : val }))

  const toggleBadge = (badge) =>
    setFilters((f) => ({
      ...f,
      badge: f.badge === badge ? null : badge,
    }))

  return (
    <div className="flex flex-col gap-6">
      {/* Category */}
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-widest
                           text-[var(--color-text-muted)] mb-3">
          Category
        </legend>
        <div className="flex flex-col gap-1.5">
          {['all', 'gear', 'clothes'].map((cat) => (
            <button key={cat} type="button"
              onClick={() => toggle('category', cat === 'all' ? null : cat)}
              className={[
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium capitalize text-left transition-colors duration-150',
                (cat === 'all' && !filters.category) || filters.category === cat
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-main)] hover:bg-[var(--color-surface-muted)]',
              ].join(' ')}>
              {cat === 'all' ? 'All Products' : cat === 'clothes' ? 'Apparel' : 'Gear'}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Price */}
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-widest
                           text-[var(--color-text-muted)] mb-3">
          Price Range
        </legend>
        <div className="flex flex-col gap-1.5">
          {PRICE_RANGES.map((r) => (
            <button key={r.label} type="button"
              onClick={() => toggle('priceRange', r.label)}
              className={[
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors duration-150',
                filters.priceRange === r.label
                  ? 'bg-[var(--color-primary)] text-white font-medium'
                  : 'text-[var(--color-text-main)] hover:bg-[var(--color-surface-muted)]',
              ].join(' ')}>
              {r.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Properties */}
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-widest
                           text-[var(--color-text-muted)] mb-3">
          Properties
        </legend>
        <div className="flex flex-wrap gap-2">
          {BADGE_OPTIONS.map((b) => (
            <button key={b} type="button" onClick={() => toggleBadge(b)}
              className={[
                'px-3 py-1 rounded-full text-xs font-semibold border transition-colors duration-150',
                filters.badge === b
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                  : 'text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
              ].join(' ')}>
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Weight */}
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-widest
                           text-[var(--color-text-muted)] mb-3">
          Weight
        </legend>
        <div className="flex flex-col gap-1.5">
          {WEIGHT_RANGES.map((r) => (
            <button key={r.label} type="button"
              onClick={() => toggle('weightRange', r.label)}
              className={[
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors duration-150',
                filters.weightRange === r.label
                  ? 'bg-[var(--color-primary)] text-white font-medium'
                  : 'text-[var(--color-text-main)] hover:bg-[var(--color-surface-muted)]',
              ].join(' ')}>
              {r.label}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

/* ─── ShopPage ───────────────────────────────────────────────────────────── */
function ShopPage() {
  const [filters, setFilters] = useState({
    category: null,
    priceRange: null,
    badge: null,
    weightRange: null,
  })
  const [sort, setSort] = useState('featured')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  const clearAll = () =>
    setFilters({ category: null, priceRange: null, badge: null, weightRange: null })

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS]

    if (filters.category) list = list.filter((p) => p.category === filters.category)

    if (filters.priceRange) {
      const r = PRICE_RANGES.find((x) => x.label === filters.priceRange)
      if (r) list = list.filter((p) => p.price >= r.min && p.price <= r.max)
    }

    if (filters.badge) list = list.filter((p) => p.badges.includes(filters.badge))

    if (filters.weightRange) {
      const r = WEIGHT_RANGES.find((x) => x.label === filters.weightRange)
      if (r) {
        list = list.filter((p) => {
          if (!p.weight) return false
          if (r.min != null && p.weight < r.min) return false
          return p.weight <= r.max
        })
      }
    }

    switch (sort) {
      case 'price-asc':  return list.sort((a, b) => a.price - b.price)
      case 'price-desc': return list.sort((a, b) => b.price - a.price)
      case 'weight-asc': return list.sort((a, b) => (a.weight ?? 9999) - (b.weight ?? 9999))
      default:           return list
    }
  }, [filters, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Page header */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)]"
              style={{ fontFamily: 'var(--font-display)' }}>
            All Gear & Apparel
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {/* Mobile filter toggle */}
          <button type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg border
                       border-[var(--color-border)] text-sm font-medium
                       text-[var(--color-text-main)] hover:border-[var(--color-primary)]
                       transition-colors duration-150">
            <IconFilter />
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full
                               bg-[var(--color-accent)] text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]
                       text-sm font-medium text-[var(--color-text-main)]
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30
                       focus:border-[var(--color-primary)] cursor-pointer">
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {Object.entries(filters).map(([key, val]) =>
            val ? (
              <button key={key} type="button"
                onClick={() => setFilters((f) => ({ ...f, [key]: null }))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                           bg-[var(--color-primary)]/10 text-[var(--color-primary)]
                           hover:bg-[var(--color-primary)]/20 transition-colors duration-150">
                {val}
                <IconClose />
              </button>
            ) : null
          )}
          <button type="button" onClick={clearAll}
            className="px-3 py-1.5 rounded-full text-xs font-semibold
                       text-[var(--color-text-muted)] hover:text-[var(--color-error)]
                       transition-colors duration-150">
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* ── Desktop sidebar ───────────────────────────────────────────── */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20 bg-[var(--color-surface)] rounded-xl
                          border border-[var(--color-border)] p-5">
            <div className="flex items-center justify-between mb-5">
              <span className="font-bold text-sm text-[var(--color-text-main)]">Filters</span>
              {activeFilterCount > 0 && (
                <button type="button" onClick={clearAll}
                  className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-error)]
                             transition-colors duration-150">
                  Clear all
                </button>
              )}
            </div>
            <FilterPanel filters={filters} setFilters={setFilters} />
          </div>
        </aside>

        {/* ── Product grid ──────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <span className="text-5xl">🏔️</span>
              <p className="font-semibold text-[var(--color-text-main)]">No gear matches your filters</p>
              <p className="text-sm text-[var(--color-text-muted)]">Try adjusting or clearing your filters.</p>
              <button type="button" onClick={clearAll}
                className="px-5 py-2 rounded-lg bg-[var(--color-primary)] text-white
                           text-sm font-semibold hover:bg-[var(--color-primary-light)]
                           transition-colors duration-150">
                Show All Gear
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((p) => <ProductCard key={p.id} {...p} />)}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile filter drawer ──────────────────────────────────────── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"
               onClick={() => setMobileFilterOpen(false)} />

          {/* Panel */}
          <div className="relative ml-auto w-80 max-w-full h-full bg-[var(--color-surface)]
                          flex flex-col shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4
                            border-b border-[var(--color-border)] sticky top-0
                            bg-[var(--color-surface)] z-10">
              <span className="font-bold text-[var(--color-text-main)]">Filters</span>
              <button type="button" onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full
                           hover:bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]
                           transition-colors duration-150">
                <IconClose />
              </button>
            </div>

            {/* Filter content */}
            <div className="flex-1 p-5">
              <FilterPanel filters={filters} setFilters={setFilters} />
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-[var(--color-border)] sticky bottom-0
                            bg-[var(--color-surface)]">
              <button type="button" onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white
                           font-semibold hover:bg-[var(--color-primary-light)]
                           transition-colors duration-150">
                Show {filtered.length} Result{filtered.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShopPage
