import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/cartStore'
import useOrderStore from '../store/orderStore'
import { formatPHP } from '../utils/format'
import ProductMedia from '../components/ProductMedia'
import CustomSelect from '../components/CustomSelect'

const STEPS = ['Address', 'Shipping', 'Payment']

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
    label: 'Provincial Door-to-Door',
    sub: '5–8 business days · Luzon / Visayas / Mindanao',
    price: 250,
    badge: null,
  },
  {
    id: 'cod',
    label: 'Cash on Delivery (COD)',
    sub: 'Metro Manila only · Includes ₱ 50 handling',
    price: 200,
    badge: 'Pay on Arrival',
  },
]

const PAYMENT_OPTIONS = [
  { id: 'cod', label: 'Cash on Delivery (COD)', sub: 'Pay courier upon delivery', disabled: false },
  { id: 'gcash', label: 'GCash', sub: 'Via PayMongo — coming soon', disabled: true },
  { id: 'paymaya', label: 'Maya (PayMaya)', sub: 'Via PayMongo — coming soon', disabled: true },
  { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard — coming soon', disabled: true },
]

/* Clean Floating-Label Input Component */
function FloatingInput({ id, label, type = 'text', value, onChange, required = false }) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        className="peer w-full px-4 pt-5 pb-2 rounded-2xl border border-gray-200 bg-white
                   text-sm font-medium text-gray-900 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20
                   focus:border-[var(--color-primary)] transition-all duration-200"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-[11px] font-bold uppercase tracking-wider text-gray-500
                   transition-all duration-200
                   peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-gray-400
                   peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[var(--color-primary)]"
      >
        {label}
      </label>
    </div>
  )
}

const PROVINCE_OPTIONS = [
  'Metro Manila (NCR)',
  'Benguet',
  'Bukidnon',
  'Davao del Sur',
  'Ifugao',
  'Kalinga',
  'Mountain Province',
  'North Cotabato',
  'Rizal',
].map((p) => ({ label: p, value: p }))

function StepIndicator({ current }) {
  return (
    <div className="flex items-center mb-10 max-w-xl mx-auto">
      {STEPS.map((label, i) => {
        const done = i < current
        const active = i === current
        const isLast = i === STEPS.length - 1
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <motion.div
                animate={{
                  scale: active ? 1.08 : 1,
                }}
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold border-2 transition-colors duration-300',
                  done
                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-sm'
                    : active
                      ? 'bg-white border-[var(--color-primary)] text-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/15'
                      : 'bg-white border-gray-200 text-gray-400',
                ].join(' ')}
              >
                {done ? '✓' : i + 1}
              </motion.div>
              <span
                className={[
                  'text-[11px] font-bold uppercase tracking-wider',
                  active || done ? 'text-[var(--color-primary)]' : 'text-gray-400',
                ].join(' ')}
              >
                {label}
              </span>
            </div>

            {!isLast && (
              <div className="flex-1 h-1 mx-3 -mt-5 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--color-primary)]"
                  initial={{ width: '0%' }}
                  animate={{ width: done ? '100%' : '0%' }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function OrderSummary({ items, deliveryPrice }) {
  const sub = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = sub + deliveryPrice

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
      <h2
        className="text-lg font-extrabold text-gray-900 mb-4"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Order Summary
      </h2>

      <ul className="flex flex-col gap-3 mb-5 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <li key={item._key} className="flex items-center gap-3">
            <div className="w-12 h-14 rounded-xl overflow-hidden bg-[var(--color-surface-muted)] shrink-0">
              <ProductMedia src={item.imageSrc} alt={item.title} category={item.category} iconSize={26} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900 line-clamp-1">{item.title}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {[item.size, item.color, `Qty ${item.quantity}`].filter(Boolean).join(' · ')}
              </p>
            </div>
            <span className="text-xs font-extrabold text-[var(--color-primary)] shrink-0">
              {formatPHP(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="h-px bg-gray-100 mb-4" />

      <div className="flex flex-col gap-2.5 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-bold text-gray-900">{formatPHP(sub)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-bold text-gray-900">{formatPHP(deliveryPrice)}</span>
        </div>
        <div className="h-px bg-gray-100 my-1" />
        <div className="flex justify-between items-baseline">
          <span className="font-bold text-gray-900">Total Due</span>
          <span className="text-2xl font-extrabold text-[var(--color-primary)]">{formatPHP(total)}</span>
        </div>
      </div>
    </div>
  )
}

function CheckoutPage() {
  const { items, clearCart } = useCartStore()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [delivery, setDelivery] = useState('metro')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [createdOrder, setCreatedOrder] = useState(null)
  const addOrder = useOrderStore((state) => state.addOrder)

  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: 'Metro Manila (NCR)',
    zip: '',
    notes: '',
  })

  const updateField = (field) => (e) =>
    setShipping((prev) => ({ ...prev, [field]: e.target.value }))

  const goToStep = (next) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  const deliveryOption = DELIVERY_OPTIONS.find((o) => o.id === delivery) ?? DELIVERY_OPTIONS[0]
  const sub = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = sub + deliveryOption.price

  const handlePlaceOrder = () => {
    const paymentLabels = {
      cod: 'Cash on Delivery (COD)',
      gcash: 'GCash',
      paymaya: 'Maya',
      card: 'Credit / Debit Card',
    }

    const orderData = {
      shippingAddress: shipping,
      deliveryMethod: delivery,
      deliveryMethodLabel: deliveryOption.label,
      paymentMethod: paymentLabels[paymentMethod] || 'Cash on Delivery (COD)',
      items: items.map((i) => ({
        id: i.id,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        size: i.size || null,
        color: i.color || null,
        imageSrc: i.imageSrc,
        category: i.category,
      })),
      subtotal: sub,
      shippingFee: deliveryOption.price,
      totalAmount: total,
    }

    const created = addOrder(orderData)
    setCreatedOrder(created)
    setOrderPlaced(true)
    clearCart()

    // Sync with backend API if accessible
    try {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderData.items,
          shippingAddress: orderData.shippingAddress,
          deliveryMethod: delivery,
          paymentMethod: paymentMethod,
        }),
      }).catch(() => {})
    } catch (_e) {}
  }

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 sm:p-10 flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-[var(--color-success)] flex items-center justify-center mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d="M20 6L9 17l-5-5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              />
            </svg>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Pack Confirmed!
          </h1>
          {createdOrder && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-800 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>Order #{createdOrder.id} · Status: To Pack</span>
            </div>
          )}
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Thank you, <span className="font-bold text-gray-900">{shipping.firstName || 'Trail Climber'}</span>.
            Your Ahon Outdoors order is queued for warehouse packing and dispatch via{' '}
            <span className="font-semibold">{deliveryOption.label}</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              to="/orders"
              className="flex-1 py-3.5 px-6 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold
                         shadow-sm hover:brightness-110 active:scale-95 transition-all duration-300 text-center"
            >
              Track in Orders Panel →
            </Link>
            <Link
              to="/shop"
              className="py-3.5 px-6 rounded-full border border-gray-200 text-gray-700 text-sm font-bold
                         hover:bg-gray-50 active:scale-95 transition-all duration-300 text-center"
            >
              Back to Shop
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 flex flex-col items-center text-center px-4">
        <p className="text-5xl mb-4">🛒</p>
        <h1
          className="text-2xl font-extrabold text-gray-900 mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Nothing to check out
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Your pack is empty. Add hiking gear or apparel first.
        </p>
        <Link
          to="/shop"
          className="px-7 py-3.5 rounded-full font-bold text-sm bg-[var(--color-primary)] text-white
                     shadow-sm hover:brightness-110 active:scale-95 transition-all duration-300"
        >
          Browse Gear
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/cart"
          className="text-sm font-semibold text-gray-500 hover:text-[var(--color-primary)] transition-colors"
        >
          ← Back to Cart
        </Link>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Distraction-Free Checkout
        </span>
      </div>

      <StepIndicator current={step} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 overflow-x-clip">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 && (
              <motion.form
                key="step-address"
                custom={direction}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onSubmit={(e) => {
                  e.preventDefault()
                  goToStep(1)
                }}
                className="flex flex-col gap-4"
              >
                <h2
                  className="text-xl font-extrabold text-gray-900 mb-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  1. Delivery Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInput
                    id="first-name"
                    label="First Name *"
                    value={shipping.firstName}
                    onChange={updateField('firstName')}
                    required
                  />
                  <FloatingInput
                    id="last-name"
                    label="Last Name *"
                    value={shipping.lastName}
                    onChange={updateField('lastName')}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInput
                    id="email"
                    type="email"
                    label="Email Address *"
                    value={shipping.email}
                    onChange={updateField('email')}
                    required
                  />
                  <FloatingInput
                    id="phone"
                    type="tel"
                    label="Mobile Number (09XX) *"
                    value={shipping.phone}
                    onChange={updateField('phone')}
                    required
                  />
                </div>

                <FloatingInput
                  id="address"
                  label="Street, Barangay, House / Unit No. *"
                  value={shipping.address}
                  onChange={updateField('address')}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FloatingInput
                    id="city"
                    label="City / Municipality *"
                    value={shipping.city}
                    onChange={updateField('city')}
                    required
                  />
                  <CustomSelect
                    variant="floating"
                    label="Province *"
                    value={shipping.province}
                    onChange={(val) => setShipping((prev) => ({ ...prev, province: val }))}
                    options={PROVINCE_OPTIONS}
                    ariaLabel="Province"
                  />
                  <FloatingInput
                    id="zip"
                    label="ZIP Code *"
                    value={shipping.zip}
                    onChange={updateField('zip')}
                    required
                  />
                </div>

                <FloatingInput
                  id="notes"
                  label="Delivery Notes (Optional)"
                  value={shipping.notes}
                  onChange={updateField('notes')}
                />

                <button
                  type="submit"
                  className="w-full py-4 mt-2 rounded-full font-bold text-sm bg-[var(--color-primary)] text-white
                             shadow-sm hover:brightness-110 hover:shadow-md active:scale-95 transition-all duration-300"
                >
                  Continue to Shipping →
                </button>
              </motion.form>
            )}

            {step === 1 && (
              <motion.div
                key="step-shipping"
                custom={direction}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <h2
                  className="text-xl font-extrabold text-gray-900 mb-5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  2. Shipping Method
                </h2>

                <div className="flex flex-col gap-3 mb-7">
                  {DELIVERY_OPTIONS.map((opt) => {
                    const active = delivery === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDelivery(opt.id)}
                        className={[
                          'flex items-center gap-4 p-4 rounded-2xl border text-left active:scale-[0.99] transition-all duration-200',
                          active
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-2 ring-[var(--color-primary)]/20'
                            : 'border-gray-200 bg-white hover:border-gray-300',
                        ].join(' ')}
                      >
                        <div
                          className={[
                            'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                            active ? 'border-[var(--color-primary)]' : 'border-gray-300',
                          ].join(' ')}
                        >
                          {active && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-gray-900">{opt.label}</span>
                            {opt.badge && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-accent)] text-white">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{opt.sub}</p>
                        </div>

                        <span className="text-sm font-extrabold text-[var(--color-primary)] shrink-0">
                          {formatPHP(opt.price)}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => goToStep(0)}
                    className="px-6 py-3.5 rounded-full border border-gray-200 font-bold text-sm text-gray-700
                               hover:bg-gray-50 active:scale-95 transition-all duration-300"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className="flex-1 py-3.5 rounded-full font-bold text-sm bg-[var(--color-primary)] text-white
                               shadow-sm hover:brightness-110 hover:shadow-md active:scale-95 transition-all duration-300"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-payment"
                custom={direction}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <h2
                  className="text-xl font-extrabold text-gray-900 mb-5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  3. Review & Payment
                </h2>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 mb-5 text-sm flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Delivering To</p>
                      <p className="font-bold text-gray-900 mt-0.5">
                        {shipping.firstName} {shipping.lastName} · {shipping.phone}
                      </p>
                      <p className="text-gray-600 text-xs mt-0.5">
                        {shipping.address}, {shipping.city}, {shipping.province} {shipping.zip}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(0)}
                      className="text-xs font-bold text-[var(--color-primary)] hover:underline"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="h-px bg-gray-200" />

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Courier</p>
                      <p className="font-bold text-gray-900 mt-0.5">
                        {deliveryOption.label} ({formatPHP(deliveryOption.price)})
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="text-xs font-bold text-[var(--color-primary)] hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 mb-6">
                  {PAYMENT_OPTIONS.map((pm) => {
                    const active = paymentMethod === pm.id
                    return (
                      <label
                        key={pm.id}
                        className={[
                          'flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200',
                          pm.disabled
                            ? 'border-gray-200 opacity-50 cursor-not-allowed bg-gray-50'
                            : active
                              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-2 ring-[var(--color-primary)]/20 cursor-pointer'
                              : 'border-gray-200 bg-white cursor-pointer',
                        ].join(' ')}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={pm.id}
                          checked={active}
                          disabled={pm.disabled}
                          onChange={() => setPaymentMethod(pm.id)}
                          className="accent-[var(--color-primary)]"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">{pm.label}</p>
                          <p className="text-xs text-gray-500">{pm.sub}</p>
                        </div>
                        {pm.disabled && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-600">
                            Soon
                          </span>
                        )}
                      </label>
                    )
                  })}
                </div>

                <div className="rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 p-4 flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-extrabold text-[var(--color-primary)]">{formatPHP(total)}</span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => goToStep(1)}
                    className="px-6 py-3.5 rounded-full border border-gray-200 font-bold text-sm text-gray-700
                               hover:bg-gray-50 active:scale-95 transition-all duration-300"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="flex-1 py-4 rounded-full font-bold text-sm bg-[var(--color-accent)] text-white
                               shadow-sm hover:brightness-110 hover:shadow-md active:scale-95 transition-all duration-300"
                  >
                    Place Order ({formatPHP(total)})
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-2">
          <OrderSummary items={items} deliveryPrice={deliveryOption.price} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
