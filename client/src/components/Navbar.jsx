import { useState, useEffect, useCallback } from 'react'
import { NavLink, Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

/* ─── SVG Icons (inline, no external dependency) ──────────────────────────── */
function IconMenu() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  )
}

function IconCart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="9"  cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

/* ─── Nav link styles ──────────────────────────────────────────────────────── */
const desktopLinkClass = ({ isActive }) =>
  [
    'text-sm font-medium tracking-wide transition-colors duration-150 pb-0.5 border-b-2',
    isActive
      ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
      : 'text-[var(--color-text-main)] border-transparent hover:text-[var(--color-primary-light)] hover:border-[var(--color-primary-light)]',
  ].join(' ')

const mobileLinkClass = ({ isActive }) =>
  [
    'block px-5 py-3.5 text-base font-medium rounded-lg transition-colors duration-150',
    isActive
      ? 'bg-[var(--color-primary)] text-white'
      : 'text-[var(--color-text-main)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]',
  ].join(' ')

/* ─── Component ────────────────────────────────────────────────────────────── */
function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const totalItems = useCartStore((state) => state.totalItems())

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  /* Close drawer on Escape key */
  useEffect(() => {
    if (!drawerOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') closeDrawer() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [drawerOpen, closeDrawer])

  /* Prevent body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const navLinks = [
    { label: 'Gear',    to: '/shop?category=gear' },
    { label: 'Clothes', to: '/shop?category=clothes' },
  ]

  return (
    <>
      {/* ── Fixed top bar ───────────────────────────────────────────────── */}
      <header
        className="fixed top-0 inset-x-0 z-50 h-[var(--spacing-navbar)]
                   bg-[var(--color-surface)] border-b border-[var(--color-border)]
                   shadow-sm"
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8
                        flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            onClick={closeDrawer}
            aria-label="Ahon Outdoors — home"
          >
            {/* Mountain glyph */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
              xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 28L12 10L18 20L22 14L28 28H4Z"
                fill="var(--color-primary)" opacity="0.9"/>
              <path d="M18 20L22 14L28 28H12L18 20Z"
                fill="var(--color-primary-dark)" opacity="0.7"/>
              <circle cx="23" cy="8" r="3" fill="var(--color-accent)" opacity="0.85"/>
            </svg>
            <span
              className="text-xl font-bold tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
            >
              Ahon
              <span className="text-[var(--color-accent)] ml-1">Outdoors</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ label, to }) => (
              <NavLink key={label} to={to} className={desktopLinkClass} end={false}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center gap-3">
            {/* Cart icon with badge */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full
                         text-[var(--color-text-main)] hover:bg-[var(--color-surface-muted)]
                         hover:text-[var(--color-primary)] transition-colors duration-150"
              aria-label={`Shopping cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
            >
              <IconCart />
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1
                             bg-[var(--color-accent)] text-white text-[10px] font-bold
                             rounded-full flex items-center justify-center leading-none"
                  aria-hidden="true"
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Hamburger (mobile only) */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full
                         text-[var(--color-text-main)] hover:bg-[var(--color-surface-muted)]
                         transition-colors duration-150"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              {drawerOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer overlay ────────────────────────────────────────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={closeDrawer}
        />
      )}

      {/* ── Mobile drawer panel ──────────────────────────────────────────── */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={[
          'fixed top-0 left-0 z-50 h-full w-72 max-w-[85vw]',
          'bg-[var(--color-surface)] shadow-xl flex flex-col md:hidden',
          'transition-transform duration-250 ease-out',
          drawerOpen ? 'translate-x-0 drawer-enter' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-[var(--spacing-navbar)]
                        border-b border-[var(--color-border)] shrink-0">
          <span
            className="text-lg font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
          >
            Ahon <span className="text-[var(--color-accent)]">Outdoors</span>
          </span>
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-full
                       text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]
                       transition-colors duration-150"
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            <IconClose />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          <NavLink to="/" className={mobileLinkClass} onClick={closeDrawer} end>
            Home
          </NavLink>
          {navLinks.map(({ label, to }) => (
            <NavLink key={label} to={to} className={mobileLinkClass} onClick={closeDrawer} end={false}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/cart" className={mobileLinkClass} onClick={closeDrawer} end>
            Cart
            {totalItems > 0 && (
              <span className="ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1
                               bg-[var(--color-accent)] text-white text-xs font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Drawer footer tagline */}
        <div className="px-5 py-4 border-t border-[var(--color-border)] shrink-0">
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            Gear built for Philippine peaks — from Mt. Pulag to Mt. Apo.
          </p>
        </div>
      </aside>
    </>
  )
}

export default Navbar

