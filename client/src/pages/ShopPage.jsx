import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import CustomSelect from '../components/CustomSelect'
import { ALL_PRODUCTS } from '../data/products'
import { formatPHP } from '../utils/format'

const MAX_CATALOG_PRICE = 12000

const WEIGHT_RANGES = [
  { label: 'Ultralight (< 200 g)', min: 0, max: 199 },
  { label: 'Midweight (200–500 g)', min: 200, max: 500 },
  { label: 'Heavy Duty (500 g+)', min: 501, max: Infinity },
]

const BADGE_OPTIONS = ['Waterproof', 'Ultralight', 'Windproof', 'Breathable', 'UV Protect', 'Merino']

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Lightest Weight', value: 'weight-asc' },
]

function IconFilter() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

/* Custom modern checkbox */
function CustomCheckbox({ checked, onChange, label }) {
  return (
    <label className="group flex items-center gap-3 py-1.5 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={[
          'w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 shrink-0',
          checked
            ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-sm'
            : 'bg-white border-gray-300 group-hover:border-[var(--color-primary)]',
        ].join(' ')}
        aria-hidden="true"
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span
        className={[
          'text-sm transition-colors duration-150',
          checked ? 'font-semibold text-gray-900' : 'text-gray-700 group-hover:text-[var(--color-primary)]',
        ].join(' ')}
      >
        {label}
      </span>
    </label>
  )
}

function FilterPanel({
  selectedCategories,
  toggleCategory,
  maxPrice,
  setMaxPrice,
  selectedBadges,
  toggleBadge,
  selectedWeights,
  toggleWeight,
}) {
  const sliderPercent = Math.round((maxPrice / MAX_CATALOG_PRICE) * 100)

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-text-muted)] mb-2.5">
          Category
        </legend>
        <div className="flex flex-col gap-0.5">
          <CustomCheckbox
            checked={selectedCategories.includes('gear')}
            onChange={() => toggleCategory('gear')}
            label="Hiking Gear"
          />
          <CustomCheckbox
            checked={selectedCategories.includes('clothes')}
            onChange={() => toggleCategory('clothes')}
            label="Outdoor Apparel"
          />
        </div>
      </fieldset>

      <div className="h-px bg-gray-100" />

      <fieldset>
        <div className="flex items-center justify-between mb-2.5">
          <legend className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-text-muted)]">
            Max Price
          </legend>
          <span className="text-xs font-extrabold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-1 rounded-full">
            {maxPrice >= MAX_CATALOG_PRICE ? 'Any' : formatPHP(maxPrice)}
          </span>
        </div>

        <input
          type="range"
          min={1000}
          max={MAX_CATALOG_PRICE}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="Maximum price filter"
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[var(--color-primary)]"
          style={{
            background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${sliderPercent}%, #E5E7EB ${sliderPercent}%, #E5E7EB 100%)`,
          }}
        />
        <div className="flex justify-between text-[11px] font-medium text-[var(--color-text-muted)] mt-1.5">
          <span>₱ 1,000</span>
          <span>₱ 12,000+</span>
        </div>
      </fieldset>

      <div className="h-px bg-gray-100" />

      <fieldset>
        <legend className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-text-muted)] mb-2.5">
          Technical Specs
        </legend>
        <div className="flex flex-col gap-0.5">
          {BADGE_OPTIONS.map((badge) => (
            <CustomCheckbox
              key={badge}
              checked={selectedBadges.includes(badge)}
              onChange={() => toggleBadge(badge)}
              label={badge}
            />
          ))}
        </div>
      </fieldset>

      <div className="h-px bg-gray-100" />

      <fieldset>
        <legend className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-text-muted)] mb-2.5">
          Weight Class
        </legend>
        <div className="flex flex-col gap-0.5">
          {WEIGHT_RANGES.map((w) => (
            <CustomCheckbox
              key={w.label}
              checked={selectedWeights.includes(w.label)}
              onChange={() => toggleWeight(w.label)}
              label={w.label}
            />
          ))}
        </div>
      </fieldset>
    </div>
  )
}

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [maxPrice, setMaxPrice] = useState(MAX_CATALOG_PRICE)
  const [selectedBadges, setSelectedBadges] = useState([])
  const [selectedWeights, setSelectedWeights] = useState([])
  const [sort, setSort] = useState('featured')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  /* Derive selectedCategories directly from URL searchParams so Navbar links stay synced */
  const rawCategory = searchParams.get('category')
  const selectedCategories = useMemo(() => {
    if (!rawCategory) return []
    return rawCategory.split(',').filter((c) => c === 'gear' || c === 'clothes')
  }, [rawCategory])

  const toggleItem = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    )
  }

  const toggleCategory = (cat) => {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat]

    const params = new URLSearchParams(searchParams)
    if (next.length > 0) {
      params.set('category', next.join(','))
    } else {
      params.delete('category')
    }
    setSearchParams(params, { replace: true })
  }

  const clearAll = () => {
    setMaxPrice(MAX_CATALOG_PRICE)
    setSelectedBadges([])
    setSelectedWeights([])
    if (searchParams.has('category')) {
      const params = new URLSearchParams(searchParams)
      params.delete('category')
      setSearchParams(params, { replace: true })
    }
  }

  const activeFilterCount =
    selectedCategories.length +
    selectedBadges.length +
    selectedWeights.length +
    (maxPrice < MAX_CATALOG_PRICE ? 1 : 0)

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS]

    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category))
    }

    if (maxPrice < MAX_CATALOG_PRICE) {
      list = list.filter((p) => p.price <= maxPrice)
    }

    if (selectedBadges.length > 0) {
      list = list.filter((p) =>
        selectedBadges.some((b) => p.badges.includes(b)),
      )
    }

    if (selectedWeights.length > 0) {
      list = list.filter((p) =>
        selectedWeights.some((label) => {
          const range = WEIGHT_RANGES.find((w) => w.label === label)
          if (!range || p.weight == null) return false
          return p.weight >= range.min && p.weight <= range.max
        }),
      )
    }

    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price)
      case 'weight-asc':
        return list.sort((a, b) => (a.weight ?? 9999) - (b.weight ?? 9999))
      default:
        return list
    }
  }, [selectedCategories, maxPrice, selectedBadges, selectedWeights, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
            Catalog
          </span>
          <h1
            className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            All Gear & Apparel
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Showing <span className="font-bold text-gray-900">{filtered.length}</span> trail-ready product{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200
                       bg-white shadow-sm text-sm font-semibold text-gray-800
                       hover:border-[var(--color-primary)] active:scale-95 transition-all duration-300"
          >
            <IconFilter />
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          <CustomSelect
            value={sort}
            onChange={setSort}
            options={SORT_OPTIONS}
            prefix="Sort:"
            ariaLabel="Sort products"
          />
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {selectedCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold capitalize
                         bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20
                         hover:bg-[var(--color-primary)]/20 active:scale-95 transition-all duration-200"
            >
              {cat === 'clothes' ? 'Apparel' : 'Gear'}
              <IconClose />
            </button>
          ))}
          {maxPrice < MAX_CATALOG_PRICE && (
            <button
              type="button"
              onClick={() => setMaxPrice(MAX_CATALOG_PRICE)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold
                         bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20
                         hover:bg-[var(--color-primary)]/20 active:scale-95 transition-all duration-200"
            >
              ≤ {formatPHP(maxPrice)}
              <IconClose />
            </button>
          )}
          {selectedBadges.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => toggleItem(setSelectedBadges, b)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold
                         bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20
                         hover:bg-[var(--color-primary)]/20 active:scale-95 transition-all duration-200"
            >
              {b}
              <IconClose />
            </button>
          ))}
          {selectedWeights.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => toggleItem(setSelectedWeights, w)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold
                         bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20
                         hover:bg-[var(--color-primary)]/20 active:scale-95 transition-all duration-200"
            >
              {w}
              <IconClose />
            </button>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="px-3 py-1.5 rounded-full text-xs font-bold text-gray-500 hover:text-[var(--color-error)] transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-8 items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="font-extrabold text-sm uppercase tracking-wider text-gray-900">
                Filters
              </span>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-semibold text-gray-500 hover:text-[var(--color-error)] transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
            <FilterPanel
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedBadges={selectedBadges}
              toggleBadge={(b) => toggleItem(setSelectedBadges, b)}
              selectedWeights={selectedWeights}
              toggleWeight={(w) => toggleItem(setSelectedWeights, w)}
            />
          </div>
        </aside>

        {/* Product Grid with Framer Motion layout rearrangement */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center py-20 px-6 gap-4 text-center">
              <span className="text-5xl">🏔️</span>
              <p className="text-lg font-bold text-gray-900">No gear matches your current filters</p>
              <p className="text-sm text-[var(--color-text-muted)] max-w-sm">
                Try raising your price ceiling or clearing a few technical filters.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold
                           shadow-sm hover:brightness-110 active:scale-95 transition-all duration-300"
              >
                Show All Gear
              </button>
            </div>
          ) : (
            <LayoutGroup>
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        layout: { type: 'spring', stiffness: 320, damping: 28 },
                        opacity: { duration: 0.2 },
                      }}
                    >
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 35 }}
              className="relative ml-auto w-80 max-w-full h-full bg-white flex flex-col shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <span className="font-extrabold text-gray-900">Filter Gear</span>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200
                             hover:bg-gray-100 text-gray-600 transition-colors"
                  aria-label="Close filters"
                >
                  <IconClose />
                </button>
              </div>

              <div className="flex-1 p-5">
                <FilterPanel
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  selectedBadges={selectedBadges}
                  toggleBadge={(b) => toggleItem(setSelectedBadges, b)}
                  selectedWeights={selectedWeights}
                  toggleWeight={(w) => toggleItem(setSelectedWeights, w)}
                />
              </div>

              <div className="p-5 border-t border-gray-200 sticky bottom-0 bg-white flex gap-2">
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="px-4 py-3 rounded-full border border-gray-200 text-xs font-bold text-gray-700
                               hover:bg-gray-50 active:scale-95 transition-all"
                  >
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold
                             hover:brightness-110 active:scale-95 transition-all duration-300 shadow-sm"
                >
                  Show {filtered.length} Result{filtered.length !== 1 ? 's' : ''}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ShopPage
