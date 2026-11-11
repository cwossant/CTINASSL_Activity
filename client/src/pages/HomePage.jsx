import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { ALL_PRODUCTS } from '../data/products'

const FEATURED = ALL_PRODUCTS.slice(0, 4)
const GEAR_PICKS  = ALL_PRODUCTS.filter((p) => p.category === 'gear').slice(0, 4)
const APPAREL_PICKS = ALL_PRODUCTS.filter((p) => p.category === 'clothes').slice(0, 4)

/* ─── Stat strip ─────────────────────────────────────────────────────────── */
const STATS = [
  { value: '50+',   label: 'Gear SKUs' },
  { value: '12',    label: 'PH Peaks Tested' },
  { value: '1,400+', label: 'Happy Climbers' },
  { value: 'Free',  label: 'MM Shipping' },
]

/* ─── Category cards ─────────────────────────────────────────────────────── */
function CategoryCard({ to, label, sub, icon }) {
  return (
    <Link to={to}
      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl
                 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]
                 p-6 min-h-[200px] hover:shadow-xl transition-all duration-300
                 hover:-translate-y-1">
      {/* BG icon */}
      <div className="absolute top-4 right-4 opacity-15 group-hover:opacity-25
                      transition-opacity duration-300 text-white text-[80px] leading-none select-none">
        {icon}
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-green-300 mb-1">
        {sub}
      </span>
      <h3 className="text-xl font-bold text-white leading-snug"
          style={{ fontFamily: 'var(--font-display)' }}>
        {label}
      </h3>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold
                       text-green-200 group-hover:gap-2 transition-all duration-200">
        Shop now <span aria-hidden="true">→</span>
      </span>
    </Link>
  )
}

/* ─── Section header ─────────────────────────────────────────────────────── */
function SectionHeader({ title, to, linkLabel = 'View all' }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text-main)]"
          style={{ fontFamily: 'var(--font-display)' }}>
        {title}
      </h2>
      <Link to={to}
        className="text-sm font-semibold text-[var(--color-primary)]
                   hover:text-[var(--color-primary-light)] transition-colors duration-150
                   flex items-center gap-1">
        {linkLabel} <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}

/* ─── HomePage ───────────────────────────────────────────────────────────── */
function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl my-6 sm:my-8
                           bg-[var(--color-primary)] min-h-[420px] sm:min-h-[480px]
                           flex items-center">
        {/* Background mountain shapes */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <svg viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice"
            className="w-full h-full opacity-10">
            <polygon points="0,480 300,100 600,480" fill="white"/>
            <polygon points="250,480 550,80 850,480" fill="white"/>
            <polygon points="600,480 900,160 1200,480" fill="white"/>
            <polygon points="800,480 1050,220 1200,340 1200,480" fill="white"/>
          </svg>
          {/* Sun / moon glow */}
          <div className="absolute top-8 right-16 w-24 h-24 rounded-full
                          bg-[var(--color-accent)] opacity-30 blur-2xl" />
        </div>

        <div className="relative z-10 px-8 sm:px-14 py-12 max-w-2xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest
                           text-green-300 mb-3 px-3 py-1 rounded-full
                           border border-green-400/30 bg-green-900/30">
            Philippine Hiking Gear
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white
                         leading-[1.1] mb-5"
              style={{ fontFamily: 'var(--font-display)' }}>
            From Sea Level<br />to Summit.
          </h1>
          <p className="text-green-100 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
            Gear built for the Philippines — Pulag's freezing ridgelines, Halcon's
            monsoon trails, and every peak in between.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm
                         bg-[var(--color-accent)] text-white
                         hover:bg-[var(--color-accent-light)] transition-colors duration-150">
              Shop All Gear →
            </Link>
            <Link to="/shop?category=clothes"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm
                         bg-white/10 text-white border border-white/20
                         hover:bg-white/20 transition-colors duration-150 backdrop-blur-sm">
              View Apparel
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {STATS.map(({ value, label }) => (
          <div key={label}
            className="flex flex-col items-center text-center py-5 px-4 rounded-xl
                       bg-[var(--color-surface)] border border-[var(--color-border)]">
            <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]"
                  style={{ fontFamily: 'var(--font-display)' }}>
              {value}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-medium mt-1">
              {label}
            </span>
          </div>
        ))}
      </section>

      {/* ── Shop by category ──────────────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader title="Shop by Category" to="/shop" linkLabel="All products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CategoryCard
            to="/shop?category=gear"
            label="Hiking Gear"
            sub="Backpacks, Tools & More"
            icon="🎒"
          />
          <CategoryCard
            to="/shop?category=clothes"
            label="Outdoor Apparel"
            sub="Jackets, Base Layers & Shirts"
            icon="🧥"
          />
        </div>
      </section>

      {/* ── Featured products ─────────────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader title="Best Sellers" to="/shop" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {FEATURED.map((p) => <ProductCard key={p.id} {...p} />)}
        </div>
      </section>

      {/* ── Gear picks ────────────────────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader title="Top Gear Picks" to="/shop?category=gear" linkLabel="All gear" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {GEAR_PICKS.map((p) => <ProductCard key={p.id} {...p} />)}
        </div>
      </section>

      {/* ── Trail-ready banner ────────────────────────────────────────── */}
      <section className="rounded-2xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]
                           p-8 sm:p-12 mb-14 flex flex-col sm:flex-row items-center gap-6
                           text-center sm:text-left">
        <div className="text-5xl shrink-0" aria-hidden="true">⛰️</div>
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text-main)] mb-2"
              style={{ fontFamily: 'var(--font-display)' }}>
            Tested on Philippine Peaks
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-xl leading-relaxed">
            Every product in our catalog has been tested on PH trails —
            from the humid rainforests of Mt. Kitanglad to the icy grasslands of Mt. Pulag.
            If it couldn't survive a Philippine summit, it's not in the shop.
          </p>
        </div>
        <Link to="/shop"
          className="shrink-0 px-6 py-3 rounded-xl font-bold text-sm
                     bg-[var(--color-primary)] text-white
                     hover:bg-[var(--color-primary-light)] transition-colors duration-150">
          Explore Gear
        </Link>
      </section>

      {/* ── Apparel picks ─────────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Apparel Picks" to="/shop?category=clothes" linkLabel="All apparel" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {APPAREL_PICKS.map((p) => <ProductCard key={p.id} {...p} />)}
        </div>
      </section>

    </div>
  )
}

export default HomePage
