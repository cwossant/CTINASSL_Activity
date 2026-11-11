import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function formatPHP(amount) {
  return `₱ ${new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */
function IconTrash() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  )
}

function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}

/* ─── Empty state ────────────────────────────────────────────────────────── */
function EmptyCart() {
  return (
    <div className="max-w-md mx-auto py-24 flex flex-col items-center text-center px-4">
      {/* Illustrated empty pack */}
      <div className="w-28 h-28 rounded-full bg-[var(--color-surface-muted)]
                      flex items-center justify-center mb-6">
        <svg width="64" height="64" viewBox="0 0 72 72" fill="none" aria-hidden="true">
          <rect x="18" y="24" width="36" height="38" rx="5"
            fill="var(--color-primary)" fillOpacity=".1" stroke="var(--color-primary)"
            strokeWidth="1.8"/>
          <path d="M27 24 Q27 12 36 12 Q45 12 45 24"
            fill="none" stroke="var(--color-primary)" strokeWidth="1.8"/>
        </svg>
      </div>
      <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-2"
          style={{ fontFamily: 'var(--font-display)' }}>
        Your pack is empty
      </h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-8 leading-relaxed">
        No gear loaded yet. Browse the catalog and add some essentials before your next
        Philippine summit.
      </p>
      <Link to="/shop"
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm
                   bg-[var(--color-primary)] text-white
                   hover:bg-[var(--color-primary-light)] transition-colors duration-150">
        Browse Gear →
      </Link>
    </div>
  )
}

/* ─── Line item ──────────────────────────────────────────────────────────── */
function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCartStore()
  const isClothes = item.category === 'clothes'

  return (
    <li className="flex gap-4 p-4 bg-[var(--color-surface)]
                   rounded-xl border border-[var(--color-border)]">
      {/* Thumbnail placeholder */}
      <div className="w-20 h-20 shrink-0 rounded-lg bg-[var(--color-surface-muted)]
                      flex items-center justify-center overflow-hidden">
        <svg width="36" height="36" viewBox="0 0 72 72" fill="none" aria-hidden="true">
          {isClothes ? (
            <path d="M22 10 L9 24 L18 28 L18 60 H54 V28 L63 24 L50 10 L41 18 H31 L22 10Z"
              fill="var(--color-primary)" fillOpacity=".2" stroke="var(--color-primary)"
              strokeWidth="2" strokeLinejoin="round"/>
          ) : (
            <>
              <rect x="18" y="24" width="36" height="38" rx="5"
                fill="var(--color-primary)" fillOpacity=".2"
                stroke="var(--color-primary)" strokeWidth="2"/>
              <path d="M27 24 Q27 12 36 12 Q45 12 45 24"
                fill="none" stroke="var(--color-primary)" strokeWidth="2"/>
            </>
          )}
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.id}`}
          className="font-semibold text-sm text-[var(--color-text-main)] leading-snug
                     hover:text-[var(--color-primary)] transition-colors duration-150 line-clamp-2">
          {item.title}
        </Link>

        {/* Variants */}
        <div className="flex flex-wrap gap-2 mt-1.5">
          {item.color && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-surface-muted)]
                             text-[var(--color-text-muted)] font-medium">
              {item.color}
            </span>
          )}
          {item.size && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-surface-muted)]
                             text-[var(--color-text-muted)] font-medium">
              Size {item.size}
            </span>
          )}
        </div>

        {/* Price (mobile) */}
        <p className="text-sm font-bold text-[var(--color-primary)] mt-2 sm:hidden">
          {formatPHP(item.price * item.quantity)}
        </p>

        {/* Qty + remove row */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center rounded-lg border border-[var(--color-border)]
                          bg-[var(--color-surface-muted)] text-sm">
            <button type="button"
              onClick={() => updateQuantity(item._key, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-[var(--color-text-muted)]
                         hover:text-[var(--color-primary)] transition-colors duration-150"
              aria-label="Decrease quantity">
              −
            </button>
            <span className="w-6 text-center font-semibold text-[var(--color-text-main)]">
              {item.quantity}
            </span>
            <button type="button"
              onClick={() => updateQuantity(item._key, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-[var(--color-text-muted)]
                         hover:text-[var(--color-primary)] transition-colors duration-150"
              aria-label="Increase quantity">
              +
            </button>
          </div>

          <button type="button"
            onClick={() => removeItem(item._key)}
            className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]
                       hover:text-[var(--color-error)] transition-colors duration-150"
            aria-label={`Remove ${item.title}`}>
            <IconTrash />
            Remove
          </button>
        </div>
      </div>

      {/* Price (desktop) */}
      <p className="hidden sm:block font-bold text-sm text-[var(--color-primary)] shrink-0 pt-0.5">
        {formatPHP(item.price * item.quantity)}
      </p>
    </li>
  )
}

/* ─── CartPage ───────────────────────────────────────────────────────────── */
function CartPage() {
  const { items, subtotal, clearCart } = useCartStore()

  if (items.length === 0) return <EmptyCart />

  const sub   = subtotal()
  const ship  = sub >= 2000 ? 0 : 150        // Free shipping over ₱ 2,000
  const total = sub + ship

  const freeShipRemaining = 2000 - sub

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-main)]"
            style={{ fontFamily: 'var(--font-display)' }}>
          Your Cart
          <span className="ml-2 text-base font-normal text-[var(--color-text-muted)]">
            ({items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''})
          </span>
        </h1>
        <button type="button" onClick={clearCart}
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-error)]
                     transition-colors duration-150">
          Clear all
        </button>
      </div>

      {/* Free shipping progress */}
      {freeShipRemaining > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-[var(--color-surface)]
                        border border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)] mb-2">
            Add{' '}
            <span className="font-bold text-[var(--color-primary)]">
              {formatPHP(freeShipRemaining)}
            </span>{' '}
            more for free Metro Manila shipping
          </p>
          <div className="h-1.5 bg-[var(--color-surface-muted)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (sub / 2000) * 100).toFixed(1)}%` }}
            />
          </div>
        </div>
      )}

      {ship === 0 && (
        <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200
                        flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <span className="text-base">🎉</span>
          You qualify for free Metro Manila shipping!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* Cart items */}
        <div className="lg:col-span-2">
          <ul className="flex flex-col gap-3">
            {items.map((item) => <CartItem key={item._key} item={item} />)}
          </ul>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-[var(--color-surface)] rounded-2xl
                          border border-[var(--color-border)] p-5 flex flex-col gap-4">
            <h2 className="font-bold text-[var(--color-text-main)]"
                style={{ fontFamily: 'var(--font-display)' }}>
              Order Summary
            </h2>

            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between text-[var(--color-text-muted)]">
                <span>Subtotal</span>
                <span className="font-medium text-[var(--color-text-main)]">{formatPHP(sub)}</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-muted)]">
                <span>Shipping</span>
                <span className={ship === 0 ? 'font-semibold text-[var(--color-success)]' : 'font-medium text-[var(--color-text-main)]'}>
                  {ship === 0 ? 'Free' : formatPHP(ship)}
                </span>
              </div>
              <div className="h-px bg-[var(--color-border)]" />
              <div className="flex justify-between font-bold text-base">
                <span className="text-[var(--color-text-main)]">Total</span>
                <span className="text-[var(--color-primary)]">{formatPHP(total)}</span>
              </div>
            </div>

            {/* CTA */}
            <button type="button"
              className="w-full py-4 rounded-xl font-bold text-sm
                         bg-[var(--color-accent)] text-white
                         hover:bg-[var(--color-accent-light)] active:scale-[0.98]
                         transition-all duration-150">
              Proceed to Checkout →
            </button>

            <Link to="/shop"
              className="text-center text-sm font-medium text-[var(--color-text-muted)]
                         hover:text-[var(--color-primary)] transition-colors duration-150">
              ← Continue Shopping
            </Link>

            {/* Trust micro-copy */}
            <div className="flex items-center justify-center gap-1.5 text-xs
                            text-[var(--color-text-muted)] mt-1">
              <IconShield />
              Secure checkout · GCash & PayMaya coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
