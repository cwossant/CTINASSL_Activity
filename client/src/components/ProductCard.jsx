import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function formatPHP(amount) {
  return `₱ ${new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`
}

const BADGE_STYLES = {
  Waterproof:   'bg-blue-100   text-blue-700',
  Ultralight:   'bg-emerald-100 text-emerald-700',
  Windproof:    'bg-sky-100    text-sky-700',
  Breathable:   'bg-teal-100   text-teal-700',
  'UV Protect': 'bg-amber-100  text-amber-700',
  Merino:       'bg-violet-100 text-violet-700',
  default:      'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]',
}

function TechBadge({ label }) {
  const cls = BADGE_STYLES[label] ?? BADGE_STYLES.default
  return (
    <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${cls}`}>
      {label}
    </span>
  )
}

function IconCartPlus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      <line x1="12" y1="9" x2="12" y2="15" /><line x1="9" y1="12" x2="15" y2="12" />
    </svg>
  )
}

/* Gear silhouette — backpack */
function GearPlaceholder() {
  return (
    <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#E8E4DD] to-[#D5CFC6]
                    flex flex-col items-center justify-center gap-3" aria-hidden="true">
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <rect x="18" y="24" width="36" height="38" rx="5"
          fill="var(--color-primary)" fillOpacity=".12" stroke="var(--color-primary)"
          strokeWidth="1.8" />
        <path d="M27 24 Q27 12 36 12 Q45 12 45 24"
          fill="none" stroke="var(--color-primary)" strokeWidth="1.8"/>
        <rect x="24" y="34" width="24" height="14" rx="3"
          fill="var(--color-primary)" fillOpacity=".18"/>
        <line x1="36" y1="24" x2="36" y2="62" stroke="var(--color-primary)"
          strokeWidth="1" strokeOpacity=".3"/>
      </svg>
      <span className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">Gear</span>
    </div>
  )
}

/* Apparel silhouette — jacket */
function ApparelPlaceholder() {
  return (
    <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#E8E4DD] to-[#D5CFC6]
                    flex flex-col items-center justify-center gap-3" aria-hidden="true">
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <path d="M22 10 L9 24 L18 28 L18 60 H54 V28 L63 24 L50 10 L41 18 H31 L22 10Z"
          fill="var(--color-primary)" fillOpacity=".12" stroke="var(--color-primary)"
          strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M31 18 Q36 26 41 18" fill="none" stroke="var(--color-primary)" strokeWidth="1.8"/>
      </svg>
      <span className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">Apparel</span>
    </div>
  )
}

function ProductCard({ id, title, price, category, badges = [], weight, imageSrc, imageAlt }) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = useCallback((e) => {
    e.preventDefault() // don't navigate when clicking the button
    addItem({ id, title, price, category,
      _key: `${id}__`,
      quantity: 1 })
  }, [addItem, id, title, price, category])

  return (
    <Link
      to={`/product/${id}`}
      className="group flex flex-col bg-[var(--color-surface)] rounded-xl
                 border border-[var(--color-border)] overflow-hidden
                 hover:shadow-lg hover:-translate-y-0.5
                 transition-all duration-200 ease-out"
      aria-label={title}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt ?? title}
            className="w-full aspect-[4/5] object-cover
                       transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
        ) : category === 'clothes' ? <ApparelPlaceholder /> : <GearPlaceholder />}

        {/* Category chip */}
        <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase
                         tracking-widest px-2 py-1 rounded
                         bg-[var(--color-primary)] text-white">
          {category === 'clothes' ? 'Apparel' : 'Gear'}
        </span>

        {/* Weight chip */}
        {weight && (
          <span className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase
                           tracking-widest px-2 py-1 rounded
                           bg-black/40 text-white backdrop-blur-sm">
            {weight < 1000 ? `${weight}g` : `${(weight/1000).toFixed(1)}kg`}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {badges.map((b) => <TechBadge key={b} label={b} />)}
          </div>
        )}

        <h3 className="text-sm font-semibold text-[var(--color-text-main)] leading-snug line-clamp-2"
            style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <p className="text-sm font-bold text-[var(--color-primary)]">
            {formatPHP(price)}
          </p>
          <button type="button" onClick={handleAdd}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg
                       bg-[var(--color-accent)] text-white text-[11px] font-bold
                       hover:bg-[var(--color-accent-light)] active:scale-95
                       transition-all duration-150"
            aria-label={`Add ${title} to cart`}>
            <IconCartPlus />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
