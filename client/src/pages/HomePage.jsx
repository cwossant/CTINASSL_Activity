import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { ALL_PRODUCTS, HERO_IMAGE } from '../data/products'

const FEATURED = ALL_PRODUCTS.slice(0, 4)
const GEAR_PICKS = ALL_PRODUCTS.filter((p) => p.category === 'gear').slice(0, 4)
const APPAREL_PICKS = ALL_PRODUCTS.filter((p) => p.category === 'clothes').slice(0, 4)

const STATS = [
  { value: '50+', label: 'Technical SKUs' },
  { value: '12', label: 'PH Peaks Tested' },
  { value: '1,400+', label: 'Summit Climbers' },
  { value: 'Free', label: 'Metro Shipping ≥ ₱2K' },
]

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
    },
  },
}

const gridItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

function CategoryCard({ to, label, sub, description, icon }) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-gray-200
                 bg-gradient-to-br from-[var(--color-primary)] via-[#23481E] to-[var(--color-primary-dark)]
                 p-7 min-h-[220px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div
        className="absolute top-4 right-5 opacity-15 group-hover:opacity-25 group-hover:scale-110
                   transition-all duration-500 text-white text-[84px] leading-none select-none"
        aria-hidden="true"
      >
        {icon}
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-1.5">
        {sub}
      </span>
      <h3
        className="text-2xl font-extrabold text-white leading-snug mb-1.5"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {label}
      </h3>
      <p className="text-sm text-green-100/85 max-w-xs mb-4">{description}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white group-hover:gap-2.5 transition-all duration-300">
        Explore Collection <span aria-hidden="true">→</span>
      </span>
    </Link>
  )
}

function SectionHeader({ title, subtitle, to, linkLabel = 'View all' }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
      <div>
        <h2
          className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{subtitle}</p>
        )}
      </div>
      <Link
        to={to}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white
                   text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] shadow-sm
                   hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]
                   active:scale-95 transition-all duration-300"
      >
        {linkLabel} <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}

function HomePage() {
  const [heroImgFailed, setHeroImgFailed] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl my-6 sm:my-8 min-h-[480px] sm:min-h-[540px] flex items-center border border-gray-200 shadow-lg bg-[#162814]">
        {!heroImgFailed && (
          <img
            src={HERO_IMAGE}
            alt="Hiker standing on a misty mountain ridge at sunrise"
            onError={() => setHeroImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02]"
          />
        )}

        {/* Fallback SVG ridge when offline */}
        {heroImgFailed && (
          <svg
            viewBox="0 0 1200 540"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full opacity-20"
            aria-hidden="true"
          >
            <polygon points="0,540 300,120 620,540" fill="white" />
            <polygon points="280,540 580,90 890,540" fill="white" />
            <polygon points="620,540 940,170 1200,540" fill="white" />
          </svg>
        )}

        {/* Layered gradient overlay for crisp text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0F1F0D]/90 via-[#182E15]/70 to-black/25"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative z-10 px-7 sm:px-14 py-14 max-w-2xl"
        >
          <span
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest
                       text-emerald-200 mb-4 px-3.5 py-1.5 rounded-full
                       border border-white/20 bg-white/10 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-light)] animate-pulse" />
            Tested on Mt. Pulag & Mt. Apo
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Conquer Every<br />Philippine Peak.
          </h1>

          <p className="text-gray-200 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
            Ultralight shells, breathable merino layers, and monsoon-proof packs built
            for Luzon ridgelines, Visayas limestone, and Mindanao summits.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm
                         bg-[var(--color-accent)] text-white shadow-md
                         hover:brightness-110 hover:shadow-lg active:scale-95 transition-all duration-300"
            >
              Shop Featured Gear <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/shop?category=clothes"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm
                         bg-white/15 text-white border border-white/30 backdrop-blur-md
                         hover:bg-white/25 active:scale-95 transition-all duration-300"
            >
              Browse Apparel
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-14">
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center py-5 px-4 rounded-2xl
                       bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <span
              className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {value}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-semibold mt-1 uppercase tracking-wider">
              {label}
            </span>
          </div>
        ))}
      </section>

      {/* Featured Gear with Framer Motion staggerChildren on scroll */}
      <section className="mb-16">
        <SectionHeader
          title="Featured Gear"
          subtitle="High-demand essentials for sea-level rainforests to freezing summit camps."
          to="/shop"
          linkLabel="Shop All"
        />

        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5"
        >
          {FEATURED.map((product) => (
            <motion.div key={product.id} variants={gridItemVariants}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Category Cards */}
      <section className="mb-16">
        <SectionHeader title="Shop by Category" to="/shop" linkLabel="All products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <CategoryCard
            to="/shop?category=gear"
            label="Technical Hiking Gear"
            sub="Packs, Poles & Camp"
            description="Dyneema alpine packs, titanium cookware, and carbon trekking poles."
            icon="🎒"
          />
          <CategoryCard
            to="/shop?category=clothes"
            label="Weatherproof Apparel"
            sub="Shells, Merino & UPF 50+"
            description="3-layer rain protection, breathable base layers, and ridge softshells."
            icon="🧥"
          />
        </div>
      </section>

      {/* Top Gear Picks */}
      <section className="mb-16">
        <SectionHeader title="Top Gear Picks" to="/shop?category=gear" linkLabel="All gear" />
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5"
        >
          {GEAR_PICKS.map((product) => (
            <motion.div key={product.id} variants={gridItemVariants}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trail-Ready Banner */}
      <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-8 sm:p-10 mb-16 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-muted)] flex items-center justify-center text-4xl shrink-0" aria-hidden="true">
          ⛰️
        </div>
        <div className="flex-1">
          <h2
            className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1.5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Field-Tested Across the Archipelago
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-xl leading-relaxed">
            From humid river crossings on Mt. Halcon to sub-zero mornings at Mt. Pulag Camp 2,
            every SKU is vetted for Philippine trail realities.
          </p>
        </div>
        <Link
          to="/shop"
          className="shrink-0 px-7 py-3.5 rounded-full font-bold text-sm bg-[var(--color-primary)] text-white
                     shadow-sm hover:brightness-110 hover:shadow-md active:scale-95 transition-all duration-300"
        >
          Explore Catalog
        </Link>
      </section>

      {/* Apparel Picks */}
      <section>
        <SectionHeader title="Apparel Picks" to="/shop?category=clothes" linkLabel="All apparel" />
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5"
        >
          {APPAREL_PICKS.map((product) => (
            <motion.div key={product.id} variants={gridItemVariants}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage
