import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ALL_PRODUCTS, getProductById } from '../data/products'
import useCartStore from '../store/cartStore'

function formatPHP(amount) {
  return `₱ ${new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`
}

const BADGE_STYLES = {
  Waterproof:   'bg-blue-100 text-blue-700',
  Ultralight:   'bg-emerald-100 text-emerald-700',
  Windproof:    'bg-sky-100 text-sky-700',
  Breathable:   'bg-teal-100 text-teal-700',
  'UV Protect': 'bg-amber-100 text-amber-700',
  Merino:       'bg-violet-100 text-violet-700',
  default:      'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]',
}

/* ─── SVG placeholders ─────────────────────────────────────────────────────── */
function GearPlaceholder() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#E8E4DD] to-[#CFC9BF]
                    flex flex-col items-center justify-center gap-4" aria-hidden="true">
      <svg width="120" height="120" viewBox="0 0 72 72" fill="none">
        <rect x="18" y="24" width="36" height="38" rx="5"
          fill="var(--color-primary)" fillOpacity=".14" stroke="var(--color-primary)" strokeWidth="1.8"/>
        <path d="M27 24 Q27 12 36 12 Q45 12 45 24"
          fill="none" stroke="var(--color-primary)" strokeWidth="1.8"/>
        <rect x="24" y="34" width="24" height="14" rx="3"
          fill="var(--color-primary)" fillOpacity=".2"/>
        <line x1="36" y1="24" x2="36" y2="62" stroke="var(--color-primary)"
          strokeWidth="1" strokeOpacity=".3"/>
      </svg>
      <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-text-muted)]">
        Gear
      </span>
    </div>
  )
}

function ApparelPlaceholder() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#E8E4DD] to-[#CFC9BF]
                    flex flex-col items-center justify-center gap-4" aria-hidden="true">
      <svg width="120" height="120" viewBox="0 0 72 72" fill="none">
        <path d="M22 10 L9 24 L18 28 L18 60 H54 V28 L63 24 L50 10 L41 18 H31 L22 10Z"
          fill="var(--color-primary)" fillOpacity=".14" stroke="var(--color-primary)"
          strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M31 18 Q36 26 41 18" fill="none" stroke="var(--color-primary)" strokeWidth="1.8"/>
      </svg>
      <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-text-muted)]">
        Apparel
      </span>
    </div>
  )
}

/* ─── Icon helpers ─────────────────────────────────────────────────────────── */
function IconChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  )
}

function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}

function IconTruck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <path d="M16 8h4l3 4v4h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  )
}

function IconReturn() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <polyline points="1 4 1 10 7 10"/>
      <path d="M3.51 15a9 9 0 1 0 .49-4"/>
    </svg>
  )
}

function IconCart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      <line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/>
    </svg>
  )
}

function IconCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

/* ─── 404 within detail ─────────────────────────────────────────────────── */
function ProductNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-4">🏔️</p>
      <h1 className="text-2xl font-bold text-[var(--color-text-main)] mb-2"
          style={{ fontFamily: 'var(--font-display)' }}>
        Product Not Found
      </h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        This item may have sold out or been removed from the catalog.
      </p>
      <Link to="/shop"
        className="inline-block px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white
                   font-semibold hover:bg-[var(--color-primary-light)] transition-colors duration-150">
        Browse All Gear
      </Link>
    </div>
  )
}

/* ─── ProductDetailPage ─────────────────────────────────────────────────── */
function ProductDetailPage() {
  const { id } = useParams()
  const product = getProductById(id)

  const addItem = useCartStore((s) => s.addItem)

  const [selectedSize, setSelectedSize]   = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [qty, setQty]                     = useState(1)
  const [added, setAdded]                 = useState(false)

  if (!product) return <ProductNotFound />

  const {
    title, price, category, badges, weight, waterproofRating,
    material, sizes, colors, stock, description, specs,
  } = product

  const hasVariants = sizes.length > 1 || (sizes[0] !== 'One Size')
  const isOutOfStock = stock === 0

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title,
      price,
      category,
      size: selectedSize,
      color: selectedColor?.label,
      quantity: qty,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  /* Related products (same category, excluding self) */
  const related = ALL_PRODUCTS.filter(
    (p) => p.category === category && p.id !== id
  ).slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] mb-6"
           aria-label="Breadcrumb">
        <Link to="/" className="hover:text-[var(--color-primary)] transition-colors duration-150">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[var(--color-primary)] transition-colors duration-150">
          Shop
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-main)] font-medium truncate max-w-[180px]">
          {title}
        </span>
      </nav>

      {/* ── Main product section ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mb-16">

        {/* Left — image gallery area */}
        <div className="flex flex-col gap-3">
          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[var(--color-surface-muted)]">
            {category === 'clothes' ? <ApparelPlaceholder /> : <GearPlaceholder />}

            {/* Category badge */}
            <span className="absolute top-4 left-4 text-[10px] font-bold uppercase
                             tracking-widest px-3 py-1.5 rounded-full
                             bg-[var(--color-primary)] text-white">
              {category === 'clothes' ? 'Apparel' : 'Gear'}
            </span>

            {stock <= 5 && stock > 0 && (
              <span className="absolute top-4 right-4 text-[10px] font-bold uppercase
                               tracking-widest px-3 py-1.5 rounded-full
                               bg-[var(--color-error)] text-white">
                Only {stock} left
              </span>
            )}
          </div>

          {/* Thumbnail strip (placeholder) */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <button key={i} type="button"
                className={[
                  'flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-colors duration-150',
                  i === 0
                    ? 'border-[var(--color-primary)]'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50',
                ].join(' ')}>
                <div className="w-full h-full bg-[var(--color-surface-muted)]
                                flex items-center justify-center">
                  {category === 'clothes'
                    ? <ApparelPlaceholder />
                    : <GearPlaceholder />
                  }
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right — product info */}
        <div className="flex flex-col gap-5">

          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span key={b}
                  className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded
                              ${BADGE_STYLES[b] ?? BADGE_STYLES.default}`}>
                  {b}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)] leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}>
            {title}
          </h1>

          {/* Price + weight row */}
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-[var(--color-primary)]">
              {formatPHP(price)}
            </span>
            {weight && (
              <span className="text-sm text-[var(--color-text-muted)] font-medium">
                {weight < 1000 ? `${weight} g` : `${(weight / 1000).toFixed(2)} kg`}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            {description}
          </p>

          {/* ── Color selector ─────────────────────────────────────────── */}
          {colors.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-main)] mb-2.5">
                Color
                {selectedColor && (
                  <span className="ml-2 font-normal text-[var(--color-text-muted)]">
                    — {selectedColor.label}
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((c) => (
                  <button key={c.label} type="button"
                    onClick={() => setSelectedColor(c)}
                    title={c.label}
                    className={[
                      'w-9 h-9 rounded-full border-2 transition-all duration-150 relative',
                      selectedColor?.label === c.label
                        ? 'border-[var(--color-primary)] scale-110 shadow-md'
                        : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/60',
                    ].join(' ')}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.label}
                    aria-pressed={selectedColor?.label === c.label}>
                    {selectedColor?.label === c.label && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-white/70" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Size selector ──────────────────────────────────────────── */}
          {hasVariants && (
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-main)] mb-2.5">
                Size
                {selectedSize && (
                  <span className="ml-2 font-normal text-[var(--color-text-muted)]">
                    — {selectedSize}
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button key={s} type="button"
                    onClick={() => setSelectedSize(s)}
                    className={[
                      'min-w-[44px] h-10 px-3 rounded-lg border text-sm font-semibold transition-all duration-150',
                      selectedSize === s
                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-main)] border-[var(--color-border)] hover:border-[var(--color-primary)]',
                    ].join(' ')}
                    aria-pressed={selectedSize === s}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Qty + Add to cart ──────────────────────────────────────── */}
          <div className="flex items-center gap-3 pt-1">
            {/* Qty stepper */}
            <div className="flex items-center rounded-xl border border-[var(--color-border)]
                            bg-[var(--color-surface)] overflow-hidden">
              <button type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-11 h-12 flex items-center justify-center text-xl font-light
                           text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]
                           transition-colors duration-150"
                aria-label="Decrease quantity">
                −
              </button>
              <span className="w-10 text-center text-sm font-bold text-[var(--color-text-main)]">
                {qty}
              </span>
              <button type="button"
                onClick={() => setQty((q) => Math.min(stock, q + 1))}
                disabled={isOutOfStock}
                className="w-11 h-12 flex items-center justify-center text-xl font-light
                           text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]
                           transition-colors duration-150 disabled:opacity-40"
                aria-label="Increase quantity">
                +
              </button>
            </div>

            {/* Add to cart CTA */}
            <button type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={[
                'flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200',
                added
                  ? 'bg-[var(--color-success)] text-white'
                  : isOutOfStock
                    ? 'bg-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed'
                    : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-light)] active:scale-[0.98]',
              ].join(' ')}>
              {added ? (
                <><IconCheck /> Added to Pack!</>
              ) : isOutOfStock ? (
                'Out of Stock'
              ) : (
                <><IconCart /> Add to Cart — {formatPHP(price * qty)}</>
              )}
            </button>
          </div>

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[var(--color-border)]">
            {[
              { icon: <IconTruck />,  label: 'Free shipping', sub: 'Metro Manila' },
              { icon: <IconReturn />, label: '14-day returns', sub: 'No questions asked' },
              { icon: <IconShield />, label: 'Genuine gear', sub: 'Direct from brands' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1.5 p-3
                                          rounded-xl bg-[var(--color-surface-muted)]">
                <span className="text-[var(--color-primary)]">{icon}</span>
                <span className="text-[11px] font-semibold text-[var(--color-text-main)] leading-tight">
                  {label}
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)]">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Technical Specs ───────────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-5"
            style={{ fontFamily: 'var(--font-display)' }}>
          Technical Specifications
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden">
          {specs.map((spec, i) => (
            <div key={spec.label}
              className={[
                'flex gap-4 px-5 py-3.5 text-sm',
                i % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-surface-muted)]',
              ].join(' ')}>
              <span className="w-44 shrink-0 font-semibold text-[var(--color-text-muted)]">
                {spec.label}
              </span>
              <span className="text-[var(--color-text-main)] font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related Products ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[var(--color-text-main)]"
                style={{ fontFamily: 'var(--font-display)' }}>
              More {category === 'clothes' ? 'Apparel' : 'Gear'}
            </h2>
            <Link to="/shop"
              className="flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]
                         hover:text-[var(--color-primary-light)] transition-colors duration-150">
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {related.map((p) => {
              /* Inline mini-card to avoid circular import of ProductCard with Link */
              const isClothes = p.category === 'clothes'
              return (
                <Link key={p.id} to={`/product/${p.id}`}
                  className="group flex flex-col bg-[var(--color-surface)] rounded-xl
                             border border-[var(--color-border)] overflow-hidden
                             hover:shadow-md hover:-translate-y-0.5
                             transition-all duration-200">
                  <div className="relative aspect-[4/5]">
                    {isClothes ? <ApparelPlaceholder /> : <GearPlaceholder />}
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-[var(--color-text-main)] line-clamp-2 leading-snug mb-1"
                       style={{ fontFamily: 'var(--font-display)' }}>
                      {p.title}
                    </p>
                    <p className="text-sm font-bold text-[var(--color-primary)]">
                      {formatPHP(p.price)}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

    </div>
  )
}

export default ProductDetailPage

