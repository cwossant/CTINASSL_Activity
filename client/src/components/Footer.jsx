import { useState } from 'react'
import { Link } from 'react-router-dom'

const FOOTER_COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Gear & Apparel', to: '/shop' },
      { label: 'Hiking Gear', to: '/shop?category=gear' },
      { label: 'Outdoor Apparel', to: '/shop?category=clothes' },
      { label: 'Your Pack (Cart)', to: '/cart' },
    ],
  },
  {
    title: 'Philippine Trails',
    links: [
      { label: 'Mt. Pulag Cold Weather', to: '/shop?category=clothes' },
      { label: 'Cordillera Ultralight', to: '/shop?category=gear' },
      { label: 'Monsoon Protection', to: '/shop?category=clothes' },
      { label: 'Express Checkout', to: '/checkout' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Metro Manila Free Delivery', to: '/cart' },
      { label: 'Provincial LBC Shipping', to: '/checkout' },
      { label: '14-Day Trail Guarantee', to: '/shop' },
      { label: 'Gear Care & Sizing', to: '/shop' },
    ],
  },
]

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-[#182816] text-gray-300 border-t border-[#263E23] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" className="inline-flex items-center gap-2.5 w-fit">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M4 28L12 10L18 20L22 14L28 28H4Z" fill="#63A85A" />
                <path d="M18 20L22 14L28 28H12L18 20Z" fill="#3D7A35" />
                <circle cx="23" cy="8" r="3" fill="var(--color-accent-light)" />
              </svg>
              <span
                className="text-xl font-extrabold tracking-tight text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Ahon <span className="text-[var(--color-accent-light)]">Outdoors</span>
              </span>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Technical hiking equipment and weather-tested apparel engineered for Philippine mountains,
              humid rainforests, and high-altitude ridges.
            </p>

            {/* Trail dispatch newsletter */}
            <form onSubmit={handleSubscribe} className="mt-2 max-w-sm">
              <label htmlFor="footer-email" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Trail Dispatch & Restock Alerts
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hiker@ahon.ph"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-white/10 border border-white/15
                             text-sm text-white placeholder:text-gray-400
                             focus:outline-none focus:border-[var(--color-accent-light)] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[var(--color-accent)] text-white text-xs font-bold
                             hover:brightness-110 active:scale-95 transition-all duration-300 shrink-0"
                >
                  {subscribed ? 'Joined!' : 'Join'}
                </button>
              </div>
            </form>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3
                  className="text-xs font-bold uppercase tracking-widest text-white mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="inline-block text-sm text-gray-400 hover:text-white hover:translate-x-1
                                   transition-all duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Ahon Outdoors · Built for Philippine Peaks.</p>
          <div className="flex items-center gap-4">
            <span>Prices in PHP (₱)</span>
            <span>·</span>
            <span>GCash & PayMaya Ready</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

