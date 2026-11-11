import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/cartStore'
import { formatPHP, FREE_SHIPPING_THRESHOLD } from '../utils/format'
import ProductMedia from '../components/ProductMedia'

function IconTrash() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function EmptyCart() {
  return (
    <div className="max-w-md mx-auto py-24 flex flex-col items-center text-center px-4">
      <div className="w-24 h-24 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-4xl mb-6">
        🎒
      </div>
      <h1
        className="text-2xl font-extrabold text-gray-900 mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Your pack is empty
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-8 leading-relaxed">
        No gear loaded yet. Browse the catalog and pack essentials for your next Philippine climb.
      </p>
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm
                   bg-[var(--color-primary)] text-white shadow-sm
                   hover:brightness-110 hover:shadow-md active:scale-95 transition-all duration-300"
      >
        Browse Gear →
      </Link>
    </div>
  )
}

function CartItem({ item, removeItem, updateQuantity }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, height: 0, marginBottom: 0, overflow: 'hidden' }}
      transition={{ duration: 0.25 }}
      className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm"
    >
      <div className="w-24 h-28 shrink-0 rounded-xl overflow-hidden bg-[var(--color-surface-muted)]">
        <ProductMedia src={item.imageSrc} alt={item.title} category={item.category} iconSize={44} />
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <Link
          to={`/product/${item.id}`}
          className="font-bold text-base text-gray-900 leading-snug hover:text-[var(--color-primary)] transition-colors line-clamp-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {item.title}
        </Link>

        {(item.color || item.size) && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {item.color && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold">
                {item.color}
              </span>
            )}
            {item.size && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold">
                Size {item.size}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-1">
            <button
              type="button"
              onClick={() => updateQuantity(item._key, item.quantity - 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-[var(--color-primary)] font-bold active:scale-95 transition-all"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-7 text-center text-sm font-extrabold text-gray-900">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item._key, item.quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-[var(--color-primary)] font-bold active:scale-95 transition-all"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <p className="text-lg font-extrabold text-[var(--color-primary)] sm:hidden">
            {formatPHP(item.price * item.quantity)}
          </p>

          <button
            type="button"
            onClick={() => removeItem(item._key)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-500
                       hover:text-[var(--color-error)] hover:bg-red-50 transition-colors"
            aria-label={`Remove ${item.title}`}
          >
            <IconTrash />
            Remove
          </button>
        </div>
      </div>

      <p className="hidden sm:block text-lg font-extrabold text-[var(--color-primary)] shrink-0 pt-0.5">
        {formatPHP(item.price * item.quantity)}
      </p>
    </motion.li>
  )
}

function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCartStore()

  if (items.length === 0) return <EmptyCart />

  const sub = subtotal()
  const ship = sub >= FREE_SHIPPING_THRESHOLD ? 0 : 150
  const total = sub + ship
  const freeShipRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - sub)
  const itemCount = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your Cart
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            {itemCount} item{itemCount !== 1 ? 's' : ''} in your trail pack
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="px-4 py-2 rounded-full border border-gray-200 bg-white text-xs font-bold text-gray-600
                     hover:text-[var(--color-error)] hover:border-red-200 active:scale-95 transition-all"
        >
          Clear All
        </button>
      </div>

      {/* Free shipping progress */}
      <div className="mb-6 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <p className="text-sm text-gray-700 font-medium mb-2">
          {freeShipRemaining > 0 ? (
            <>
              Add <span className="font-extrabold text-[var(--color-primary)]">{formatPHP(freeShipRemaining)}</span> more for free Metro Manila shipping
            </>
          ) : (
            <span className="font-bold text-[var(--color-success)]">
              You qualify for free Metro Manila shipping!
            </span>
          )}
        </p>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-primary)] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Animated Cart List */}
        <div className="lg:col-span-2">
          <ul className="flex flex-col gap-3.5">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <CartItem
                  key={item._key}
                  item={item}
                  removeItem={removeItem}
                  updateQuantity={updateQuantity}
                />
              ))}
            </AnimatePresence>
          </ul>
        </div>

        {/* Sticky Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
            <h2
              className="text-lg font-extrabold text-gray-900"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Order Summary
            </h2>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">{formatPHP(sub)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Shipping</span>
                <span className={ship === 0 ? 'font-bold text-[var(--color-success)]' : 'font-bold text-gray-900'}>
                  {ship === 0 ? 'Free' : formatPHP(ship)}
                </span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-[var(--color-primary)]">{formatPHP(total)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full py-4 rounded-full font-bold text-sm text-center bg-[var(--color-accent)] text-white
                         shadow-sm hover:brightness-110 hover:shadow-md active:scale-95 transition-all duration-300"
            >
              Proceed to Checkout →
            </Link>

            <Link
              to="/shop"
              className="text-center text-sm font-semibold text-gray-500 hover:text-[var(--color-primary)] transition-colors"
            >
              ← Continue Shopping
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 pt-1">
              <IconShield />
              Secure checkout · GCash & PayMaya coming soon
            </div>
          </div>
        </div>
      </div>

      {/* Prominent sticky mobile checkout bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Total</p>
          <p className="text-lg font-extrabold text-[var(--color-primary)]">{formatPHP(total)}</p>
        </div>
        <Link
          to="/checkout"
          className="px-7 py-3 rounded-full bg-[var(--color-accent)] text-white text-sm font-bold
                     shadow-sm hover:brightness-110 active:scale-95 transition-all duration-300"
        >
          Checkout →
        </Link>
      </div>
    </div>
  )
}

export default CartPage
