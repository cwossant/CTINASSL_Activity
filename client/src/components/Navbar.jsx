import { useState, useEffect, useCallback } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/cartStore'
import useOrderStore from '../store/orderStore'

function IconCart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function AnimatedHamburger({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <motion.line
        x1="3"
        x2="21"
        animate={open ? { y1: 12, y2: 12, rotate: 45 } : { y1: 6, y2: 6, rotate: 0 }}
        transition={{ duration: 0.22 }}
        style={{ originX: '12px', originY: '12px' }}
      />
      <motion.line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.2 : 1 }}
        transition={{ duration: 0.16 }}
      />
      <motion.line
        x1="3"
        x2="21"
        animate={open ? { y1: 12, y2: 12, rotate: -45 } : { y1: 18, y2: 18, rotate: 0 }}
        transition={{ duration: 0.22 }}
        style={{ originX: '12px', originY: '12px' }}
      />
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'All Shop', to: '/shop', matchCategory: null },
  { label: 'Gear', to: '/shop?category=gear', matchCategory: 'gear' },
  { label: 'Clothes', to: '/shop?category=clothes', matchCategory: 'clothes' },
]

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const totalItems = useCartStore((state) => state.totalItems())
  const openCartDrawer = useCartStore((state) => state.openDrawer)
  const activeOrdersCount = useOrderStore((state) =>
    state.orders.filter((o) => ['to_pack', 'to_ship', 'to_deliver'].includes(o.status)).length,
  )

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const currentParams = new URLSearchParams(location.search)
  const activeCategory = currentParams.get('category')

  const isNavActive = (item) => {
    if (location.pathname !== '/shop') return false
    return item.matchCategory === activeCategory
  }

  useEffect(() => {
    if (!drawerOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [drawerOpen, closeDrawer])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  return (
    <>
      <header
        className="sticky top-0 z-40 h-[var(--spacing-navbar)]
                   backdrop-blur-md bg-white/80 border-b border-gray-200/80 shadow-sm"
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            onClick={closeDrawer}
            aria-label="Ahon Outdoors — home"
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            >
              <path d="M4 28L12 10L18 20L22 14L28 28H4Z" fill="var(--color-primary)" />
              <path d="M18 20L22 14L28 28H12L18 20Z" fill="var(--color-primary-dark)" opacity="0.75" />
              <circle cx="23" cy="8" r="3" fill="var(--color-accent)" />
            </svg>
            <span
              className="text-xl font-extrabold tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
            >
              Ahon<span className="text-[var(--color-accent)] ml-1">Outdoors</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
            {NAV_LINKS.map((item) => {
              const active = isNavActive(item)
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={[
                    'relative px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300',
                    active
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'text-gray-700 hover:text-[var(--color-primary-light)] hover:bg-gray-100/80',
                  ].join(' ')}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="desktop-nav-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              )
            })}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                [
                  'px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300',
                  isActive
                    ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 font-bold'
                    : 'text-gray-700 hover:text-[var(--color-primary-light)] hover:bg-gray-100/80',
                ].join(' ')
              }
            >
              Cart
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                [
                  'relative px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5',
                  isActive
                    ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 font-bold'
                    : 'text-gray-700 hover:text-[var(--color-primary-light)] hover:bg-gray-100/80',
                ].join(' ')
              }
            >
              <span>Orders</span>
              {activeOrdersCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-amber-500 text-white leading-none">
                  {activeOrdersCount}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCartDrawer}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full border border-gray-200
                         bg-white/90 text-gray-800 shadow-sm hover:border-[var(--color-primary)]
                         hover:text-[var(--color-primary)] active:scale-95 transition-all duration-300"
              aria-label={`Open cart drawer, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
            >
              <IconCart />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Pack</span>
              <AnimatePresence mode="popLayout">
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                    className="min-w-[20px] h-5 px-1.5 bg-[var(--color-accent)] text-white text-[11px]
                               font-extrabold rounded-full flex items-center justify-center leading-none"
                    aria-hidden="true"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-gray-200
                         bg-white/90 text-gray-800 hover:bg-gray-100 active:scale-95 transition-all duration-300"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <AnimatedHamburger open={drawerOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-out drawer with Framer Motion */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm md:hidden"
              aria-hidden="true"
              onClick={closeDrawer}
            />

            <motion.aside
              key="mobile-panel"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
              className="fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl
                         flex flex-col md:hidden border-r border-gray-200"
            >
              <div className="flex items-center justify-between px-5 h-[var(--spacing-navbar)] border-b border-gray-200 shrink-0">
                <span
                  className="text-lg font-extrabold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
                >
                  Ahon <span className="text-[var(--color-accent)]">Outdoors</span>
                </span>
                <button
                  type="button"
                  className="flex items-center justify-center w-9 h-9 rounded-full text-gray-500
                             hover:bg-gray-100 hover:text-gray-900 active:scale-95 transition-all duration-200"
                  onClick={closeDrawer}
                  aria-label="Close menu"
                >
                  <AnimatedHamburger open />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-1.5" aria-label="Mobile navigation">
                <NavLink
                  to="/"
                  onClick={closeDrawer}
                  end
                  className={({ isActive }) =>
                    [
                      'px-4 py-3 text-base font-semibold rounded-full transition-all duration-200',
                      isActive
                        ? 'bg-[var(--color-primary)] text-white shadow-sm'
                        : 'text-gray-800 hover:bg-gray-100 hover:text-[var(--color-primary)]',
                    ].join(' ')
                  }
                >
                  Home
                </NavLink>

                {NAV_LINKS.map((item) => {
                  const active = isNavActive(item)
                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={closeDrawer}
                      className={[
                        'px-4 py-3 text-base font-semibold rounded-full transition-all duration-200',
                        active
                          ? 'bg-[var(--color-primary)] text-white shadow-sm'
                          : 'text-gray-800 hover:bg-gray-100 hover:text-[var(--color-primary)]',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>
                  )
                })}

                <NavLink
                  to="/cart"
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    [
                      'flex items-center justify-between px-4 py-3 text-base font-semibold rounded-full transition-all duration-200',
                      isActive
                        ? 'bg-[var(--color-primary)] text-white shadow-sm'
                        : 'text-gray-800 hover:bg-gray-100 hover:text-[var(--color-primary)]',
                    ].join(' ')
                  }
                >
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full">
                      {totalItems}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/orders"
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    [
                      'flex items-center justify-between px-4 py-3 text-base font-semibold rounded-full transition-all duration-200',
                      isActive
                        ? 'bg-[var(--color-primary)] text-white shadow-sm'
                        : 'text-gray-800 hover:bg-gray-100 hover:text-[var(--color-primary)]',
                    ].join(' ')
                  }
                >
                  <span>My Orders</span>
                  {activeOrdersCount > 0 && (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 bg-amber-500 text-white text-xs font-extrabold rounded-full">
                      {activeOrdersCount} active
                    </span>
                  )}
                </NavLink>
              </nav>

              <div className="p-5 border-t border-gray-200 bg-[var(--color-background)] shrink-0">
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  Gear built for Philippine peaks — from Mt. Pulag to Mt. Apo.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
