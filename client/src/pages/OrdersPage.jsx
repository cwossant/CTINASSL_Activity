import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useOrderStore, { ORDER_STATUSES } from '../store/orderStore'
import { formatPHP } from '../utils/format'
import ProductMedia from '../components/ProductMedia'

function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function IconPackage() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4 7.55 4.24a1.8 1.8 0 0 0-1.8 0L3.1 5.76a1.8 1.8 0 0 0-.9 1.56v9.36a1.8 1.8 0 0 0 .9 1.56l2.65 1.52a1.8 1.8 0 0 0 1.8 0l8.95-5.16a1.8 1.8 0 0 0 .9-1.56V11a1.8 1.8 0 0 0-.9-1.6z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  )
}

function IconTruck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 4v4h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconCheckCircle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function IconSparkles() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
}

const TABS = [
  { key: 'all', label: 'All Orders' },
  { key: 'to_pack', label: 'To Pack', icon: IconPackage },
  { key: 'to_ship', label: 'To Ship', icon: IconTruck },
  { key: 'to_deliver', label: 'To Deliver', icon: IconMapPin },
  { key: 'delivered', label: 'Delivered', icon: IconCheckCircle },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedOrders, setExpandedOrders] = useState({})

  const orders = useOrderStore((state) => state.orders)
  const advanceStatus = useOrderStore((state) => state.advanceStatus)

  const toggleExpand = (id) => {
    setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Count per tab
  const counts = useMemo(() => {
    const c = { all: orders.length, to_pack: 0, to_ship: 0, to_deliver: 0, delivered: 0 }
    orders.forEach((o) => {
      if (c[o.status] !== undefined) c[o.status]++
    })
    return c
  }, [orders])

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab = activeTab === 'all' || order.status === activeTab
      if (!matchesTab) return false

      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      const matchesId = order.id.toLowerCase().includes(q)
      const matchesTracking = order.trackingNumber?.toLowerCase().includes(q)
      const matchesCourier = order.courier?.toLowerCase().includes(q)
      const matchesItem = order.items.some((item) => item.title.toLowerCase().includes(q))
      const matchesCity = order.shippingAddress?.city?.toLowerCase().includes(q)

      return matchesId || matchesTracking || matchesCourier || matchesItem || matchesCity
    })
  }, [orders, activeTab, searchQuery])

  return (
    <div className="min-h-screen pb-20 pt-6 sm:pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">
          <Link to="/" className="hover:text-[var(--color-primary)] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">My Orders</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1
              className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Order Tracking & Dispatch Panel
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              Track the live journey of your Philippine hiking gear from our warehouse packing line to your summit-ready doorstep.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white
                         font-bold text-xs uppercase tracking-wider text-gray-700 shadow-sm
                         hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300"
            >
              Explore Shop
            </Link>
          </div>
        </div>

        {/* Quick Status Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div
            onClick={() => setActiveTab('to_pack')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 ${
              activeTab === 'to_pack'
                ? 'bg-amber-500/10 border-amber-400 ring-2 ring-amber-400/20 shadow-sm'
                : 'bg-white border-gray-200/90 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">To Pack</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900 mt-2">{counts.to_pack}</p>
            <p className="text-xs text-gray-500 mt-0.5">Warehouse packing</p>
          </div>

          <div
            onClick={() => setActiveTab('to_ship')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 ${
              activeTab === 'to_ship'
                ? 'bg-blue-500/10 border-blue-400 ring-2 ring-blue-400/20 shadow-sm'
                : 'bg-white border-gray-200/90 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800">To Ship</span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900 mt-2">{counts.to_ship}</p>
            <p className="text-xs text-gray-500 mt-0.5">Dispatched to hub</p>
          </div>

          <div
            onClick={() => setActiveTab('to_deliver')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 ${
              activeTab === 'to_deliver'
                ? 'bg-purple-500/10 border-purple-400 ring-2 ring-purple-400/20 shadow-sm'
                : 'bg-white border-gray-200/90 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800">To Deliver</span>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900 mt-2">{counts.to_deliver}</p>
            <p className="text-xs text-gray-500 mt-0.5">Out with courier</p>
          </div>

          <div
            onClick={() => setActiveTab('delivered')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 ${
              activeTab === 'delivered'
                ? 'bg-emerald-500/10 border-emerald-400 ring-2 ring-emerald-400/20 shadow-sm'
                : 'bg-white border-gray-200/90 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Delivered</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900 mt-2">{counts.delivered}</p>
            <p className="text-xs text-gray-500 mt-0.5">Completed orders</p>
          </div>
        </div>

        {/* Tab Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 bg-white p-2 rounded-2xl border border-gray-200/80 shadow-sm">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {TABS.map((tab) => {
              const active = activeTab === tab.key
              const count = counts[tab.key] ?? 0
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                  }`}
                >
                  {tab.icon && <tab.icon />}
                  <span>{tab.label}</span>
                  <span
                    className={`ml-0.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold leading-none ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search order ID or item..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 bg-gray-50/70
                         focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]
                         transition-all"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <IconSearch />
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-xs text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-4">
              <IconPackage />
            </div>
            <h3
              className="text-lg font-bold text-gray-900 mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              No orders found
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {searchQuery
                ? `No orders matching "${searchQuery}" in this category.`
                : `You currently have no orders in the "${TABS.find((t) => t.key === activeTab)?.label}" status.`}
            </p>
            <div className="flex gap-3 justify-center">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2.5 rounded-full border border-gray-200 font-bold text-xs uppercase tracking-wider text-gray-700 hover:bg-gray-50"
                >
                  Clear Search
                </button>
              ) : (
                <Link
                  to="/shop"
                  className="px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:brightness-110 transition-all"
                >
                  Shop Trail Gear
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((order) => {
                const statusMeta = ORDER_STATUSES[order.status] || ORDER_STATUSES.to_pack
                const isExpanded = expandedOrders[order.id]

                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Order Header */}
                    <div className="p-5 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50/60 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-extrabold text-gray-900 text-base sm:text-lg tracking-tight">
                          #{order.id}
                        </span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-500 font-medium">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs font-semibold text-gray-600 bg-gray-100/90 px-2.5 py-1 rounded-md">
                          {order.courier} ({order.trackingNumber})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        {/* Status Badge */}
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide ${statusMeta.badgeClass}`}
                        >
                          <span className={`w-2 h-2 rounded-full ${statusMeta.dotClass} ${['to_pack', 'to_ship', 'to_deliver'].includes(order.status) ? 'animate-ping' : ''}`} />
                          <span>{statusMeta.label}</span>
                        </div>

                        {/* Interactive Status Simulator Tool */}
                        <button
                          type="button"
                          onClick={() => advanceStatus(order.id)}
                          title="Simulate advancing this order to the next shipping status"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white
                                     text-[11px] font-bold text-gray-700 shadow-2xs hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]
                                     hover:border-[var(--color-primary)]/40 active:scale-95 transition-all cursor-pointer"
                        >
                          <IconSparkles />
                          <span className="hidden sm:inline">Simulate Status ⏩</span>
                        </button>
                      </div>
                    </div>

                    {/* Visual Stepper Timeline */}
                    <div className="px-5 sm:px-8 py-5 bg-gray-50/50 border-b border-gray-100">
                      <div className="relative flex items-center justify-between max-w-3xl mx-auto">
                        {/* Track line behind steps */}
                        <div className="absolute left-6 right-6 top-4 h-1 bg-gray-200 -z-0" />
                        <div
                          className="absolute left-6 top-4 h-1 bg-[var(--color-primary)] transition-all duration-500 -z-0"
                          style={{
                            width: `${
                              order.status === 'to_pack'
                                ? '25%'
                                : order.status === 'to_ship'
                                  ? '50%'
                                  : order.status === 'to_deliver'
                                    ? '75%'
                                    : order.status === 'delivered'
                                      ? '96%'
                                      : '0%'
                            }`,
                          }}
                        />

                        {/* Step 1: Placed */}
                        <div className="flex flex-col items-center relative z-10">
                          <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                            ✓
                          </div>
                          <span className="text-[11px] font-bold text-gray-900 mt-1.5">Placed</span>
                        </div>

                        {/* Step 2: To Pack */}
                        <div className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              ['to_pack', 'to_ship', 'to_deliver', 'delivered'].includes(order.status)
                                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                                : 'bg-white border-2 border-gray-200 text-gray-400'
                            }`}
                          >
                            {order.status === 'to_pack' ? '📦' : '✓'}
                          </div>
                          <span
                            className={`text-[11px] font-bold mt-1.5 ${
                              order.status === 'to_pack' ? 'text-amber-800' : 'text-gray-700'
                            }`}
                          >
                            To Pack
                          </span>
                        </div>

                        {/* Step 3: To Ship */}
                        <div className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              ['to_ship', 'to_deliver', 'delivered'].includes(order.status)
                                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                                : 'bg-white border-2 border-gray-200 text-gray-400'
                            }`}
                          >
                            {order.status === 'to_ship' ? '🚚' : ['to_deliver', 'delivered'].includes(order.status) ? '✓' : '3'}
                          </div>
                          <span
                            className={`text-[11px] font-bold mt-1.5 ${
                              order.status === 'to_ship' ? 'text-blue-800' : 'text-gray-700'
                            }`}
                          >
                            To Ship
                          </span>
                        </div>

                        {/* Step 4: To Deliver */}
                        <div className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              ['to_deliver', 'delivered'].includes(order.status)
                                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                                : 'bg-white border-2 border-gray-200 text-gray-400'
                            }`}
                          >
                            {order.status === 'to_deliver' ? '🛵' : order.status === 'delivered' ? '✓' : '4'}
                          </div>
                          <span
                            className={`text-[11px] font-bold mt-1.5 ${
                              order.status === 'to_deliver' ? 'text-purple-800' : 'text-gray-700'
                            }`}
                          >
                            To Deliver
                          </span>
                        </div>

                        {/* Step 5: Delivered */}
                        <div className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              order.status === 'delivered'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-white border-2 border-gray-200 text-gray-400'
                            }`}
                          >
                            {order.status === 'delivered' ? '✓' : '5'}
                          </div>
                          <span
                            className={`text-[11px] font-bold mt-1.5 ${
                              order.status === 'delivered' ? 'text-emerald-800' : 'text-gray-400'
                            }`}
                          >
                            Delivered
                          </span>
                        </div>
                      </div>

                      {/* Current Status Headline */}
                      <p className="text-center text-xs font-medium text-gray-600 mt-4">
                        <span className="font-bold text-gray-900">{statusMeta.label}:</span>{' '}
                        {order.status === 'to_deliver' && `Expected ${order.estimatedDelivery}. `}
                        {statusMeta.shortDesc}
                      </p>
                    </div>

                    {/* Order Body / Items Preview */}
                    <div className="p-5 sm:p-6">
                      <div className="divide-y divide-gray-100">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/80">
                              <ProductMedia
                                src={item.imageSrc}
                                alt={item.title}
                                category={item.category}
                                iconSize={36}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-gray-900 truncate">
                                {item.title}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                                {item.size && (
                                  <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-medium">
                                    Size: {item.size}
                                  </span>
                                )}
                                {item.color && (
                                  <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-medium">
                                    Color: {item.color}
                                  </span>
                                )}
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-sm font-extrabold text-gray-900">
                                {formatPHP(item.price * item.quantity)}
                              </span>
                              {item.quantity > 1 && (
                                <p className="text-[11px] text-gray-400">
                                  {formatPHP(item.price)} each
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Expanded Details Drawer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pt-4 mt-4 border-t border-gray-100"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
                              <div>
                                <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[10px] mb-1.5">
                                  Shipping Destination
                                </h5>
                                <p className="font-semibold text-gray-800">
                                  {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                                </p>
                                <p className="text-gray-600 mt-0.5">
                                  {order.shippingAddress?.address}
                                </p>
                                <p className="text-gray-600">
                                  {order.shippingAddress?.city}, {order.shippingAddress?.province}{' '}
                                  {order.shippingAddress?.zip}
                                </p>
                                <p className="text-gray-500 mt-1">
                                  Phone: {order.shippingAddress?.phone}
                                </p>
                              </div>

                              <div>
                                <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[10px] mb-1.5">
                                  Courier & Tracking History
                                </h5>
                                <p className="text-gray-700">
                                  <span className="font-bold">Courier:</span> {order.courier}
                                </p>
                                <p className="text-gray-700">
                                  <span className="font-bold">Waybill No:</span> {order.trackingNumber}
                                </p>
                                <p className="text-gray-700">
                                  <span className="font-bold">Service:</span> {order.deliveryMethod}
                                </p>
                                <p className="text-gray-700 mt-1">
                                  <span className="font-bold">Payment Method:</span>{' '}
                                  {order.paymentMethod} ({order.paymentStatus})
                                </p>
                              </div>
                            </div>

                            {/* Detailed Tracking Timeline Log */}
                            <div className="mt-4 pt-3 border-t border-gray-100">
                              <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[10px] mb-3">
                                Detailed Courier Milestones
                              </h5>
                              <div className="space-y-2.5">
                                {order.timeline?.map((event, idx) => (
                                  <div key={idx} className="flex items-start gap-3 text-xs">
                                    <span
                                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                        event.current
                                          ? 'bg-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/20'
                                          : event.done
                                            ? 'bg-emerald-500'
                                            : 'bg-gray-300'
                                      }`}
                                    />
                                    <div className="flex-1">
                                      <p
                                        className={`font-semibold ${
                                          event.current
                                            ? 'text-[var(--color-primary)] font-bold'
                                            : event.done
                                              ? 'text-gray-800'
                                              : 'text-gray-400'
                                        }`}
                                      >
                                        {event.label}
                                      </p>
                                    </div>
                                    <span className="text-[11px] text-gray-400 whitespace-nowrap">
                                      {event.time}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Footer Actions & Price Breakdown */}
                      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => toggleExpand(order.id)}
                          className="text-xs font-bold text-[var(--color-primary)] hover:underline self-start cursor-pointer"
                        >
                          {isExpanded ? '▲ Hide Tracking Details' : '▼ View Shipping Address & Courier Milestones'}
                        </button>

                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <span className="text-xs text-gray-500">
                            Shipping: <span className="font-bold text-gray-800">{formatPHP(order.shippingFee)}</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-500">Order Total:</span>
                            <span className="text-base sm:text-lg font-extrabold text-[var(--color-primary)]">
                              {formatPHP(order.totalAmount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

