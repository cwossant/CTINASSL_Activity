import { useState } from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function formatPHP(amount) {
  return `₱ ${new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`
}

/* ─── Step indicator ──────────────────────────────────────────────────────── */
const STEPS = ['Shipping', 'Delivery', 'Review']

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((label, i) => {
        const done    = i < current
        const active  = i === current
        const isLast  = i === STEPS.length - 1
        return (
          <div key={label} className="flex items-center flex-1">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className={[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300',
                done   ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                : active ? 'bg-white border-[var(--color-primary)] text-[var(--color-primary)]'
                         : 'bg-white border-[var(--color-border)] text-[var(--color-text-muted)]',
              ].join(' ')}>
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={[
                'text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap',
                active ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]',
              ].join(' ')}>
                {label}
              </span>
            </div>
            {/* Connector */}
            {!isLast && (
              <div className={[
                'flex-1 h-0.5 mx-2 mt-[-18px] transition-colors duration-300',
                done ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]',
              ].join(' ')} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ─── Form helpers ────────────────────────────────────────────────────────── */
function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor}
      className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
      {children}
    </label>
  )
}

function Input({ id, type = 'text', placeholder, ...rest }) {
  return (
    <input id={id} type={type} placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)]
                 bg-[var(--color-surface)] text-sm text-[var(--color-text-main)]
                 placeholder:text-[var(--color-text-muted)]
                 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30
                 focus:border-[var(--color-primary)] transition-colors duration-150"
      {...rest}
    />
  )
}

function Select({ id, children, ...rest }) {
  return (
    <select id={id}
      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)]
                 bg-[var(--color-surface)] text-sm text-[var(--color-text-main)]
                 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30
                 focus:border-[var(--color-primary)] transition-colors duration-150 cursor-pointer"
      {...rest}>
      {children}
    </select>
  )
}

/* ─── Delivery options ────────────────────────────────────────────────────── */
const DELIVERY_OPTIONS = [
  {
    id: 'metro',
    label: 'Metro Manila Standard',
    sub: '2–4 business days · LBC / J&T Express',
    price: 150,
    badge: null,
  },
  {
    id: 'metro-express',
    label: 'Metro Manila Express',
    sub: 'Next business day if ordered before 12 NN',
    price: 290,
    badge: 'Fastest',
  },
  {
    id: 'provincial',
    label: 'Provincial Delivery',
    sub: '5–8 business days · LBC Door-to-Door',
    price: 250,
    badge: null,
  },
  {
    id: 'cod',
    label: 'Cash on Delivery (COD)',
    sub: 'Metro Manila only · Additional ₱ 50 handling',
    price: 200,
    badge: 'No card needed',
  },
]

/* ─── Order summary sidebar ───────────────────────────────────────────────── */
function OrderSummary({ items, deliveryPrice }) {
  const sub   = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = sub + deliveryPrice
  const isClothes = (cat) => cat === 'clothes'

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-5">
      <h2 className="font-bold text-[var(--color-text-main)] mb-4"
          style={{ fontFamily: 'var(--font-display)' }}>
        Order Summary
      </h2>

      {/* Items */}
      <ul className="flex flex-col gap-3 mb-4">
        {items.map((item) => (
          <li key={item._key} className="flex items-center gap-3">
            {/* Mini thumbnail */}
            <div className="w-12 h-12 rounded-lg bg-[var(--color-surface-muted)]
                            flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 72 72" fill="none" aria-hidden="true">
                {isClothes(item.category) ? (
                  <path d="M22 10 L9 24 L18 28 L18 60 H54 V28 L63 24 L50 10 L41 18 H31 L22 10Z"
                    fill="var(--color-primary)" fillOpacity=".25"
                    stroke="var(--color-primary)" strokeWidth="3"/>
                ) : (
                  <>
                    <rect x="18" y="24" width="36" height="38" rx="5"
                      fill="var(--color-primary)" fillOpacity=".25"
                      stroke="var(--color-primary)" strokeWidth="3"/>
                    <path d="M27 24 Q27 12 36 12 Q45 12 45 24"
                      fill="none" stroke="var(--color-primary)" strokeWidth="3"/>
                  </>
                )}
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[var(--color-text-main)] line-clamp-1 leading-snug">
                {item.title}
              </p>
              {(item.size || item.color) && (
                <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                  {[item.size, item.color].filter(Boolean).join(' · ')}
                </p>
              )}
              <p className="text-[10px] text-[var(--color-text-muted)]">Qty {item.quantity}</p>
            </div>
            <span className="text-xs font-bold text-[var(--color-primary)] shrink-0">
              {formatPHP(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="h-px bg-[var(--color-border)] mb-3" />

      {/* Totals */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-[var(--color-text-muted)]">
          <span>Subtotal</span>
          <span className="font-medium text-[var(--color-text-main)]">{formatPHP(sub)}</span>
        </div>
        <div className="flex justify-between text-[var(--color-text-muted)]">
          <span>Shipping</span>
          <span className="font-medium text-[var(--color-text-main)]">{formatPHP(deliveryPrice)}</span>
        </div>
        <div className="h-px bg-[var(--color-border)] my-1" />
        <div className="flex justify-between font-bold text-base">
          <span className="text-[var(--color-text-main)]">Total</span>
          <span className="text-[var(--color-primary)]">{formatPHP(total)}</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Step 1 — Shipping Address ───────────────────────────────────────────── */
function StepShipping({ onNext }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-[var(--color-text-main)] mb-6"
          style={{ fontFamily: 'var(--font-display)' }}>
        Shipping Address
      </h2>

      {/* Guest / account toggle */}
      <div className="flex gap-2 mb-6 p-1 bg-[var(--color-surface-muted)] rounded-xl">
        {['Guest Checkout', 'Sign In'].map((label, i) => (
          <button key={label} type="button"
            className={[
              'flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150',
              i === 0
                ? 'bg-white shadow-sm text-[var(--color-text-main)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]',
            ].join(' ')}>
            {label}
          </button>
        ))}
      </div>

      <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onNext() }}>
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first-name">First Name *</Label>
            <Input id="first-name" placeholder="Juan" required />
          </div>
          <div>
            <Label htmlFor="last-name">Last Name *</Label>
            <Input id="last-name" placeholder="dela Cruz" required />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" type="email" placeholder="juan@trail.ph" required />
        </div>

        <div>
          <Label htmlFor="phone">Mobile Number *</Label>
          <Input id="phone" type="tel" placeholder="09XX XXX XXXX" required />
        </div>

        <div>
          <Label htmlFor="address">Street Address *</Label>
          <Input id="address" placeholder="House / Unit No., Street, Barangay" required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">City / Municipality *</Label>
            <Input id="city" placeholder="Baguio City" required />
          </div>
          <div>
            <Label htmlFor="province">Province *</Label>
            <Select id="province" required>
              <option value="">Select province</option>
              <option>Benguet</option>
              <option>Bukidnon</option>
              <option>Davao del Sur</option>
              <option>Ifugao</option>
              <option>Kalinga</option>
              <option>Metro Manila (NCR)</option>
              <option>Mountain Province</option>
              <option>North Cotabato</option>
              <option>Rizal</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="zip">ZIP Code *</Label>
            <Input id="zip" placeholder="2600" required />
          </div>
        </div>

        <div>
          <Label htmlFor="notes">Delivery Notes (optional)</Label>
          <Input id="notes" placeholder="e.g. Leave at gate, call before delivery" />
        </div>

        <button type="submit"
          className="w-full py-4 mt-2 rounded-xl font-bold text-sm
                     bg-[var(--color-primary)] text-white
                     hover:bg-[var(--color-primary-light)] active:scale-[0.98]
                     transition-all duration-150">
          Continue to Delivery →
        </button>
      </form>
    </div>
  )
}

/* ─── Step 2 — Delivery Method ────────────────────────────────────────────── */
function StepDelivery({ selectedId, onSelect, onNext, onBack }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-[var(--color-text-main)] mb-6"
          style={{ fontFamily: 'var(--font-display)' }}>
        Delivery Method
      </h2>

      <div className="flex flex-col gap-3 mb-8">
        {DELIVERY_OPTIONS.map((opt) => {
          const active = selectedId === opt.id
          return (
            <button key={opt.id} type="button"
              onClick={() => onSelect(opt.id)}
              className={[
                'flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150',
                active
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40',
              ].join(' ')}>
              {/* Radio dot */}
              <div className={[
                'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                active ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)]',
              ].join(' ')}>
                {active && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-[var(--color-text-main)]">
                    {opt.label}
                  </span>
                  {opt.badge && (
                    <span className="text-[9px] font-bold uppercase tracking-wider
                                     px-2 py-0.5 rounded bg-[var(--color-accent)] text-white">
                      {opt.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{opt.sub}</p>
              </div>

              {/* Price */}
              <span className="text-sm font-bold text-[var(--color-primary)] shrink-0">
                {formatPHP(opt.price)}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack}
          className="px-6 py-3.5 rounded-xl border border-[var(--color-border)] font-semibold text-sm
                     text-[var(--color-text-main)] hover:border-[var(--color-primary)]
                     transition-colors duration-150">
          ← Back
        </button>
        <button type="button" onClick={onNext}
          className="flex-1 py-3.5 rounded-xl font-bold text-sm
                     bg-[var(--color-primary)] text-white
                     hover:bg-[var(--color-primary-light)] active:scale-[0.98]
                     transition-all duration-150">
          Review Order →
        </button>
      </div>
    </div>
  )
}

/* ─── Step 3 — Review & Pay ───────────────────────────────────────────────── */
function StepReview({ items, delivery, onBack }) {
  const opt   = DELIVERY_OPTIONS.find((o) => o.id === delivery) ?? DELIVERY_OPTIONS[0]
  const sub   = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = sub + opt.price

  return (
    <div>
      <h2 className="text-lg font-bold text-[var(--color-text-main)] mb-6"
          style={{ fontFamily: 'var(--font-display)' }}>
        Review & Pay
      </h2>

      {/* Mocked shipping summary */}
      <div className="rounded-xl border border-[var(--color-border)] p-4 mb-5 text-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-[var(--color-text-main)]">Shipping to</p>
            <p className="text-[var(--color-text-muted)] mt-0.5">
              Juan dela Cruz — 09XX XXX XXXX<br />
              123 Sample St., Baguio City, Benguet 2600
            </p>
          </div>
          <button type="button"
            className="text-xs font-semibold text-[var(--color-primary)]
                       hover:text-[var(--color-primary-light)] transition-colors duration-150">
            Edit
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] p-4 mb-5 text-sm">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-[var(--color-text-main)]">Delivery</p>
            <p className="text-[var(--color-text-muted)] mt-0.5">{opt.label} — {formatPHP(opt.price)}</p>
          </div>
          <button type="button"
            className="text-xs font-semibold text-[var(--color-primary)]
                       hover:text-[var(--color-primary-light)] transition-colors duration-150">
            Change
          </button>
        </div>
      </div>

      {/* Payment section */}
      <div className="rounded-xl border border-[var(--color-border)] p-5 mb-6">
        <p className="font-bold text-sm text-[var(--color-text-main)] mb-4">Payment Method</p>

        <div className="flex flex-col gap-2.5">
          {[
            { id: 'gcash',   label: 'GCash',       sub: 'Via PayMongo — coming soon', disabled: true,  color: '#00AEEF' },
            { id: 'paymaya', label: 'PayMaya',      sub: 'Via PayMongo — coming soon', disabled: true,  color: '#6B2C8F' },
            { id: 'card',    label: 'Credit / Debit Card', sub: 'Visa, Mastercard, JCB — coming soon', disabled: true, color: '#1A73E8' },
            { id: 'cod',     label: 'Cash on Delivery', sub: 'Metro Manila only · +₱ 50 handling', disabled: false, color: '#2D5A27' },
          ].map((pm) => (
            <label key={pm.id}
              className={[
                'flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-150',
                pm.disabled
                  ? 'border-[var(--color-border)] opacity-50 cursor-not-allowed'
                  : 'border-[var(--color-primary)] bg-[var(--color-primary)]/5',
              ].join(' ')}>
              <input type="radio" name="payment" value={pm.id}
                defaultChecked={pm.id === 'cod'}
                disabled={pm.disabled}
                className="accent-[var(--color-primary)]" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--color-text-main)]">{pm.label}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{pm.sub}</p>
              </div>
              {pm.disabled && (
                <span className="text-[9px] font-bold uppercase tracking-wider
                                 px-2 py-0.5 rounded bg-[var(--color-surface-muted)]
                                 text-[var(--color-text-muted)]">
                  Soon
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Total callout */}
      <div className="rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20
                      p-4 flex justify-between items-center mb-6">
        <span className="font-bold text-[var(--color-text-main)]">Total due</span>
        <span className="text-2xl font-extrabold text-[var(--color-primary)]">
          {formatPHP(total)}
        </span>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack}
          className="px-6 py-3.5 rounded-xl border border-[var(--color-border)] font-semibold text-sm
                     text-[var(--color-text-main)] hover:border-[var(--color-primary)]
                     transition-colors duration-150">
          ← Back
        </button>
        <button type="button"
          className="flex-1 py-3.5 rounded-xl font-bold text-sm
                     bg-[var(--color-accent)] text-white
                     hover:bg-[var(--color-accent-light)] active:scale-[0.98]
                     transition-all duration-150">
          Place Order — Cash on Delivery
        </button>
      </div>

      <p className="text-center text-xs text-[var(--color-text-muted)] mt-4">
        By placing your order you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}

/* ─── CheckoutPage ────────────────────────────────────────────────────────── */
function CheckoutPage() {
  const { items, subtotal } = useCartStore()
  const [step, setStep]       = useState(0)
  const [delivery, setDelivery] = useState('metro')

  const deliveryPrice = DELIVERY_OPTIONS.find((o) => o.id === delivery)?.price ?? 150

  /* Empty cart redirect UI */
  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 flex flex-col items-center text-center px-4">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-2"
            style={{ fontFamily: 'var(--font-display)' }}>
          Nothing to check out
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Your cart is empty. Add some gear first.
        </p>
        <Link to="/shop"
          className="px-6 py-3 rounded-xl font-bold text-sm bg-[var(--color-primary)]
                     text-white hover:bg-[var(--color-primary-light)]
                     transition-colors duration-150">
          Browse Gear
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] mb-6"
           aria-label="Breadcrumb">
        <Link to="/cart" className="hover:text-[var(--color-primary)] transition-colors duration-150">
          Cart
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-main)] font-medium">Checkout</span>
      </nav>

      {/* Logo */}
      <div className="mb-8 text-center">
        <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
          Ahon <span className="text-[var(--color-accent)]">Outdoors</span>
        </span>
        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Secure Checkout</p>
      </div>

      <StepIndicator current={step} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Form area */}
        <div className="lg:col-span-3">
          {step === 0 && <StepShipping onNext={() => setStep(1)} />}
          {step === 1 && (
            <StepDelivery
              selectedId={delivery}
              onSelect={setDelivery}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <StepReview
              items={items}
              delivery={delivery}
              onBack={() => setStep(1)}
            />
          )}
        </div>

        {/* Summary sidebar */}
        <div className="lg:col-span-2">
          <OrderSummary items={items} deliveryPrice={deliveryPrice} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

