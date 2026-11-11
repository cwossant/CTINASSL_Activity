import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import { formatPHP, BADGE_STYLES } from '../utils/format'
import ProductMedia from './ProductMedia'

function TechBadge({ label }) {
  const cls = BADGE_STYLES[label] ?? BADGE_STYLES.default
  return (
    <span
      className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${cls}`}
    >
      {label}
    </span>
  )
}

function IconCartPlus() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      <line x1="12" y1="9" x2="12" y2="15" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ProductCard({ id, title, price, category, badges = [], weight, imageSrc, imageAlt }) {
  const addItem = useCartStore((s) => s.addItem)
  const [justAdded, setJustAdded] = useState(false)

  const handleAdd = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      addItem({ id, title, price, category, imageSrc, quantity: 1 })
      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 1400)
    },
    [addItem, id, title, price, category, imageSrc],
  )

  return (
    <Link
      to={`/product/${id}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm
                 overflow-hidden transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:border-gray-300"
      aria-label={`${title}, ${formatPHP(price)}`}
    >
      {/* Product image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-muted)]">
        <ProductMedia
          src={imageSrc}
          alt={imageAlt ?? title}
          category={category}
          className="transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Subtle gradient overlay at top for readable pills */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

        {/* Category pill */}
        <span
          className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest
                     px-2.5 py-1 rounded-full bg-[var(--color-primary)]/95 text-white shadow-sm backdrop-blur-sm"
        >
          {category === 'clothes' ? 'Apparel' : 'Gear'}
        </span>

        {/* Weight chip */}
        {weight && (
          <span
            className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider
                       px-2.5 py-1 rounded-full bg-black/55 text-white backdrop-blur-md"
          >
            {weight < 1000 ? `${weight}g` : `${(weight / 1000).toFixed(1)}kg`}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4 gap-2.5">
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {badges.map((b) => (
              <TechBadge key={b} label={b} />
            ))}
          </div>
        )}

        <h3
          className="text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-2
                     group-hover:text-[var(--color-primary)] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>

        <div className="mt-auto flex flex-col gap-2.5 pt-2.5 border-t border-gray-100">
          <p className="text-lg sm:text-xl font-extrabold text-[var(--color-primary)] tracking-tight whitespace-nowrap">
            {formatPHP(price)}
          </p>

          <button
            type="button"
            onClick={handleAdd}
            className={[
              'w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap',
              'text-white shadow-sm active:scale-95 transition-all duration-300',
              justAdded
                ? 'bg-[var(--color-success)] shadow-md'
                : 'bg-[var(--color-accent)] hover:brightness-110 hover:shadow-md',
            ].join(' ')}
            aria-label={`Add ${title} to cart`}
          >
            {justAdded ? <IconCheck /> : <IconCartPlus />}
            <span>{justAdded ? 'Added to Pack' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
