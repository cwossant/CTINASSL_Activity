import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/cartStore'
import { formatPHP, FREE_SHIPPING_THRESHOLD } from '../utils/format'
import ProductMedia from './ProductMedia'

function IconClose() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function IconTrash() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  )
}

function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCartStore()

  useEffect(() => {
    if (!isDrawerOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isDrawerOpen, closeDrawer])

  const sub = subtotal()
  const count = totalItems()
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - sub)
  const progressPct = Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Slide-out drawer from right */}
          <motion.aside
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Pack Drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[var(--color-background)]
                       shadow-2xl border-l border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
              <div>
                <h2
                  className="text-lg font-extrabold text-gray-900"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Your Trail Pack
                </h2>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {count} item{count !== 1 ? 's' : ''} ready for dispatch
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center
                           text-gray-500 hover:text-gray-900 hover:bg-gray-100 active:scale-95 transition-all duration-200"
                aria-label="Close cart drawer"
              >
                <IconClose />
              </button>
            </div>

            {/* Free shipping progress */}
            {items.length > 0 && (
              <div className="px-5 py-3 bg-white/90 border-b border-gray-200 shrink-0">
                <p className="text-xs font-medium text-gray-700 mb-1.5">
                  {remaining > 0 ? (
                    <>
                      Add <span className="font-bold text-[var(--color-primary)]">{formatPHP(remaining)}</span> more for free Metro Manila shipping
                    </>
                  ) : (
                    <span className="font-bold text-[var(--color-success)]">Free Metro Manila shipping unlocked!</span>
                  )}
                </p>
                <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[var(--color-primary)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* Item list */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-3xl mb-4">
                    🎒
                  </div>
                  <p className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    Your pack is empty
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-xs">
                    Load up on weatherproof jackets, ultralight packs, and trail essentials.
                  </p>
                  <Link
                    to="/shop"
                    onClick={closeDrawer}
                    className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold
                               hover:brightness-110 active:scale-95 transition-all duration-300 shadow-sm"
                  >
                    Explore Gear
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.li
                        key={item._key}
                        layout
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85, height: 0, marginBottom: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-3.5 p-3.5 bg-white rounded-2xl border border-gray-200 shadow-sm"
                      >
                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-[var(--color-surface-muted)] shrink-0">
                          <ProductMedia src={item.imageSrc} alt={item.title} category={item.category} iconSize={36} />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col">
                          <Link
                            to={`/product/${item.id}`}
                            onClick={closeDrawer}
                            className="text-sm font-bold text-gray-900 hover:text-[var(--color-primary)] line-clamp-2 leading-snug"
                          >
                            {item.title}
                          </Link>

                          {(item.color || item.size) && (
                            <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                              {[item.color, item.size ? `Size ${item.size}` : null].filter(Boolean).join(' · ')}
                            </p>
                          )}

                          <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                            <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item._key, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[var(--color-primary)] font-bold"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item._key, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[var(--color-primary)] font-bold"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <span className="text-sm font-extrabold text-[var(--color-primary)]">
                              {formatPHP(item.price * item.quantity)}
                            </span>

                            <button
                              type="button"
                              onClick={() => removeItem(item._key)}
                              className="p-1.5 rounded-full text-gray-400 hover:text-[var(--color-error)] hover:bg-red-50 transition-colors"
                              aria-label={`Remove ${item.title}`}
                            >
                              <IconTrash />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Sticky bottom checkout bar */}
            {items.length > 0 && (
              <div className="sticky bottom-0 p-5 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-[var(--color-text-muted)]">Subtotal</span>
                  <span className="text-xl font-extrabold text-[var(--color-primary)]">{formatPHP(sub)}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/checkout"
                    onClick={closeDrawer}
                    className="w-full py-3.5 rounded-full bg-[var(--color-accent)] text-white text-center text-sm font-bold
                               shadow-sm hover:brightness-110 hover:shadow-md active:scale-95 transition-all duration-300"
                  >
                    Checkout Now →
                  </Link>
                  <Link
                    to="/cart"
                    onClick={closeDrawer}
                    className="w-full py-2.5 rounded-full border border-gray-200 text-gray-700 text-center text-xs font-bold
                               hover:bg-gray-50 active:scale-95 transition-all duration-300"
                  >
                    View Full Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer

