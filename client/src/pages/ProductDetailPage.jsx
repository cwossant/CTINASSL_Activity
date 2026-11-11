import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ALL_PRODUCTS, getProductById } from '../data/products'
import useCartStore from '../store/cartStore'
import { formatPHP, BADGE_STYLES } from '../utils/format'
import ProductMedia from '../components/ProductMedia'
import ProductCard from '../components/ProductCard'

function IconChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function IconTruck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 4v4h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

function IconReturn() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4" />
    </svg>
  )
}

function IconCart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ProductNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-4">🏔️</p>
      <h1
        className="text-2xl font-extrabold text-gray-900 mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Product Not Found
      </h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        This item may have sold out or been removed from the catalog.
      </p>
      <Link
        to="/shop"
        className="inline-block px-7 py-3.5 rounded-full bg-[var(--color-primary)] text-white
                   text-sm font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all duration-300"
      >
        Browse All Gear
      </Link>
    </div>
  )
}

function ProductDetailContent({ product }) {
  const addItem = useCartStore((s) => s.addItem)
  const openDrawer = useCartStore((s) => s.openDrawer)

  const {
    id,
    title,
    price,
    category,
    badges,
    weight,
    sizes,
    colors,
    stock,
    description,
    specs,
    gallery,
    imageSrc,
  } = product

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(
    sizes?.length === 1 ? sizes[0] : sizes?.[1] ?? sizes?.[0] ?? null,
  )
  const [selectedColor, setSelectedColor] = useState(colors?.[0] ?? null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const slides = gallery?.length
    ? gallery
    : [{ src: imageSrc, label: title }]

  const hasVariants = sizes.length > 1 || sizes[0] !== 'One Size'
  const isOutOfStock = stock === 0

  const handlePrevImage = () =>
    setActiveImageIndex((i) => (i === 0 ? slides.length - 1 : i - 1))

  const handleNextImage = () =>
    setActiveImageIndex((i) => (i === slides.length - 1 ? 0 : i + 1))

  const handleAddToCart = () => {
    addItem({
      id,
      title,
      price,
      category,
      imageSrc: slides[0]?.src ?? imageSrc,
      size: selectedSize,
      color: selectedColor?.label,
      quantity: qty,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = ALL_PRODUCTS.filter((p) => p.category === category && p.id !== id).slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-7" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[var(--color-primary)] transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold truncate max-w-[220px]">{title}</span>
      </nav>

      {/* Main Product Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mb-16">
        {/* Left: Hover-zoom Gallery + Thumbnail Carousel */}
        <div className="flex flex-col gap-3.5">
          <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-white border border-gray-200 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0.3, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.3 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full"
              >
                <ProductMedia
                  src={slides[activeImageIndex]?.src}
                  alt={`${title} — ${slides[activeImageIndex]?.label ?? 'View'}`}
                  category={category}
                  iconSize={112}
                  className="transition-transform duration-700 ease-out group-hover:scale-110 cursor-zoom-in"
                />
              </motion.div>
            </AnimatePresence>

            <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[var(--color-primary)]/95 text-white shadow-sm backdrop-blur-sm">
              {category === 'clothes' ? 'Apparel' : 'Gear'}
            </span>

            {stock <= 10 && stock > 0 && (
              <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[var(--color-accent)] text-white shadow-sm">
                Only {stock} left
              </span>
            )}

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                             bg-white/85 backdrop-blur-md border border-gray-200 text-gray-800 shadow-md
                             flex items-center justify-center opacity-85 hover:opacity-100
                             hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <IconChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                             bg-white/85 backdrop-blur-md border border-gray-200 text-gray-800 shadow-md
                             flex items-center justify-center opacity-85 hover:opacity-100
                             hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <IconChevronRight />
                </button>

                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md text-[11px] font-semibold text-white">
                  {slides[activeImageIndex]?.label} ({activeImageIndex + 1}/{slides.length})
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {slides.map((slide, idx) => {
              const active = idx === activeImageIndex
              return (
                <button
                  key={`${slide.label}-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={[
                    'relative aspect-square rounded-2xl overflow-hidden border bg-white transition-all duration-200 active:scale-95',
                    active
                      ? 'ring-2 ring-[var(--color-primary)] ring-offset-2 border-[var(--color-primary)] shadow-md'
                      : 'border-gray-200 opacity-75 hover:opacity-100 hover:border-gray-300',
                  ].join(' ')}
                  aria-label={`View ${slide.label}`}
                  aria-current={active ? 'true' : undefined}
                >
                  <ProductMedia src={slide.src} alt={slide.label} category={category} iconSize={40} />
                </button>
              )
            })}
          </div>
        </div>

        {/* Right: Info & Interactive Selectors */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col gap-5">
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b}
                    className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${BADGE_STYLES[b] ?? BADGE_STYLES.default}`}
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}

            <h1
              className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h1>

            <div className="flex items-baseline gap-4 pb-4 border-b border-gray-100">
              <span className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
                {formatPHP(price)}
              </span>
              {weight && (
                <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-bold text-gray-700">
                  {weight < 1000 ? `${weight} g` : `${(weight / 1000).toFixed(2)} kg`}
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>

            {/* Color Swatches */}
            {colors.length > 0 && (
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-3">
                  Colorway
                  {selectedColor && (
                    <span className="ml-2 font-semibold normal-case text-gray-500">
                      — {selectedColor.label}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-3">
                  {colors.map((c) => {
                    const active = selectedColor?.label === c.label
                    return (
                      <motion.button
                        key={c.label}
                        type="button"
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setSelectedColor(c)}
                        title={c.label}
                        className={[
                          'w-10 h-10 rounded-full border border-gray-300 transition-all duration-200 relative',
                          active
                            ? 'ring-2 ring-[var(--color-primary)] ring-offset-2 scale-105 shadow-md'
                            : 'hover:scale-105 hover:ring-2 hover:ring-gray-300 hover:ring-offset-1',
                        ].join(' ')}
                        style={{ backgroundColor: c.hex }}
                        aria-label={c.label}
                        aria-pressed={active}
                      >
                        {active && (
                          <motion.span
                            layoutId="active-color-dot"
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-white shadow" />
                          </motion.span>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Size Variant Pills */}
            {hasVariants && (
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-3">
                  Size
                  {selectedSize && (
                    <span className="ml-2 font-semibold normal-case text-gray-500">
                      — {selectedSize}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {sizes.map((s) => {
                    const active = selectedSize === s
                    return (
                      <motion.button
                        key={s}
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setSelectedSize(s)}
                        className={[
                          'min-w-[48px] h-11 px-4 rounded-full border text-sm font-bold transition-all duration-200',
                          active
                            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/35 ring-offset-2 shadow-sm'
                            : 'bg-white text-gray-800 border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
                        ].join(' ')}
                        aria-pressed={active}
                      >
                        {s}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Qty + Add to Cart CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <div className="inline-flex items-center justify-between rounded-full border border-gray-200 bg-gray-50 px-2 h-12 sm:w-36">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-white hover:text-[var(--color-primary)] active:scale-95 transition-all"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-sm font-extrabold text-gray-900">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(stock, q + 1))}
                  disabled={isOutOfStock}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-white hover:text-[var(--color-primary)] active:scale-95 transition-all disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={[
                  'flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-sm shadow-sm active:scale-95 transition-all duration-300',
                  added
                    ? 'bg-[var(--color-success)] text-white shadow-md'
                    : isOutOfStock
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[var(--color-accent)] text-white hover:brightness-110 hover:shadow-md',
                ].join(' ')}
              >
                {added ? (
                  <>
                    <IconCheck /> Added to Pack!
                  </>
                ) : isOutOfStock ? (
                  'Out of Stock'
                ) : (
                  <>
                    <IconCart /> Add to Cart — {formatPHP(price * qty)}
                  </>
                )}
              </button>
            </div>

            {added && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800"
              >
                <span>Added {qty}× {title} to your pack.</span>
                <button
                  type="button"
                  onClick={openDrawer}
                  className="underline font-bold hover:text-emerald-950"
                >
                  Open Pack →
                </button>
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <IconTruck />, label: 'Free MM Shipping', sub: 'Orders ≥ ₱ 2,000' },
              { icon: <IconReturn />, label: '14-Day Returns', sub: 'Trail guarantee' },
              { icon: <IconShield />, label: '100% Authentic', sub: 'Direct warranty' },
            ].map(({ icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-1.5 p-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm"
              >
                <span className="text-[var(--color-primary)]">{icon}</span>
                <span className="text-xs font-bold text-gray-900 leading-tight">{label}</span>
                <span className="text-[11px] text-[var(--color-text-muted)]">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Specifications Table */}
      <section className="mb-16">
        <h2
          className="text-2xl font-extrabold text-gray-900 mb-5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Technical Specifications
        </h2>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <tbody>
              {specs.map((spec, i) => (
                <tr
                  key={spec.label}
                  className={[
                    'border-b last:border-b-0 border-gray-100 transition-colors duration-150 hover:bg-[var(--color-primary)]/5',
                    i % 2 === 0 ? 'bg-gray-50' : 'bg-white',
                  ].join(' ')}
                >
                  <th
                    scope="row"
                    className="w-44 sm:w-56 px-5 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500"
                  >
                    {spec.label}
                  </th>
                  <td className="px-5 py-4 text-sm sm:text-base font-semibold text-gray-900">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-2xl font-extrabold text-gray-900"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              More {category === 'clothes' ? 'Apparel' : 'Gear'}
            </h2>
            <Link
              to={`/shop?category=${category}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white
                         text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] shadow-sm
                         hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
            >
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function ProductDetailPage() {
  const { id } = useParams()
  const product = getProductById(id)

  if (!product) return <ProductNotFound />

  return <ProductDetailContent key={id} product={product} />
}

export default ProductDetailPage
