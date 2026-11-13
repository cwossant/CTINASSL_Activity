import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const ORDER_STATUSES = {
  to_pack: {
    key: 'to_pack',
    label: 'To Pack',
    shortDesc: 'Being packed & verified at Ahon Ridge Warehouse',
    stepIndex: 1,
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    dotClass: 'bg-amber-500',
    icon: 'Package',
  },
  to_ship: {
    key: 'to_ship',
    label: 'To Ship',
    shortDesc: 'Packed & handed over to courier sorting hub',
    stepIndex: 2,
    badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
    dotClass: 'bg-blue-500',
    icon: 'Truck',
  },
  to_deliver: {
    key: 'to_deliver',
    label: 'To Deliver',
    shortDesc: 'Out for delivery to your doorstep today',
    stepIndex: 3,
    badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
    dotClass: 'bg-purple-500',
    icon: 'MapPin',
  },
  delivered: {
    key: 'delivered',
    label: 'Delivered',
    shortDesc: 'Successfully received and signed',
    stepIndex: 4,
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    dotClass: 'bg-emerald-500',
    icon: 'CheckCircle',
  },
  cancelled: {
    key: 'cancelled',
    label: 'Cancelled',
    shortDesc: 'Order was cancelled',
    stepIndex: 0,
    badgeClass: 'bg-red-50 text-red-800 border-red-200',
    dotClass: 'bg-red-500',
    icon: 'XCircle',
  },
}

const INITIAL_MOCK_ORDERS = [
  {
    id: 'AHN-8491',
    createdAt: '2026-11-13T08:30:00Z',
    status: 'to_deliver',
    courier: 'J&T Express',
    trackingNumber: 'JT-PH-99482103',
    estimatedDelivery: 'Today by 6:00 PM',
    deliveryMethod: 'Metro Manila Express',
    shippingAddress: {
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      phone: '0917-889-1234',
      address: 'Unit 4B Mountain View Residences, Ortigas Ave',
      city: 'Pasig City',
      province: 'Metro Manila',
      zip: '1605',
    },
    items: [
      {
        id: 'prod-001',
        title: 'Ultralight Rain Jacket — 3L Gore-Tex',
        price: 7995,
        quantity: 1,
        size: 'L',
        color: 'Forest Olive',
        imageSrc:
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
        category: 'clothes',
      },
      {
        id: 'prod-007',
        title: 'Trekking Pole Set — Carbon Fibre Twist-Lock',
        price: 3400,
        quantity: 1,
        size: 'One Size',
        color: 'Matte Carbon',
        imageSrc:
          'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=900&q=80',
        category: 'gear',
      },
    ],
    subtotal: 11395,
    shippingFee: 290,
    totalAmount: 11685,
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'pending',
    timeline: [
      { label: 'Order Confirmed', time: 'Nov 12, 10:15 AM', done: true },
      { label: 'Packed & Weighed at Warehouse', time: 'Nov 12, 02:40 PM', done: true },
      { label: 'Dispatched to Sorting Hub', time: 'Nov 13, 05:20 AM', done: true },
      { label: 'Out for Delivery (Rider: Mark R.)', time: 'Nov 13, 08:45 AM', done: true, current: true },
      { label: 'Package Delivered', time: 'Expected by 6:00 PM', done: false },
    ],
  },
  {
    id: 'AHN-8320',
    createdAt: '2026-11-13T14:10:00Z',
    status: 'to_ship',
    courier: 'LBC Express',
    trackingNumber: 'LBC-MNL-482019',
    estimatedDelivery: 'Nov 15 – Nov 17, 2026',
    deliveryMethod: 'Provincial Door-to-Door',
    shippingAddress: {
      firstName: 'Maria',
      lastName: 'Santos',
      phone: '0918-554-7890',
      address: 'Km 5 Asin Road, San Luis Village',
      city: 'Baguio City',
      province: 'Benguet',
      zip: '2600',
    },
    items: [
      {
        id: 'prod-005',
        title: '45L Alpine Assault Pack — Dyneema Frame',
        price: 11500,
        quantity: 1,
        size: 'One Size',
        color: 'Slate Black',
        imageSrc:
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80',
        category: 'gear',
      },
      {
        id: 'prod-002',
        title: 'Merino Wool Base Layer Long Sleeve',
        price: 2850,
        quantity: 1,
        size: 'M',
        color: 'Natural Ecru',
        imageSrc:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
        category: 'clothes',
      },
    ],
    subtotal: 14350,
    shippingFee: 250,
    totalAmount: 14600,
    paymentMethod: 'GCash',
    paymentStatus: 'paid',
    timeline: [
      { label: 'Order Confirmed', time: 'Nov 13, 02:10 PM', done: true },
      { label: 'Inspected & Packed in Manila', time: 'Nov 13, 04:30 PM', done: true },
      { label: 'Awaiting LBC Courier Pickup', time: 'Nov 13, 05:00 PM', done: true, current: true },
      { label: 'In Transit to Benguet Hub', time: 'Scheduled Nov 14', done: false },
      { label: 'Package Delivered', time: 'Pending', done: false },
    ],
  },
  {
    id: 'AHN-8199',
    createdAt: '2026-11-13T20:15:00Z',
    status: 'to_pack',
    courier: 'Flash Express',
    trackingNumber: 'FL-PH-671299',
    estimatedDelivery: 'Nov 16 – Nov 18, 2026',
    deliveryMethod: 'Metro Manila Standard',
    shippingAddress: {
      firstName: 'Carlos',
      lastName: 'Tan',
      phone: '0922-311-9876',
      address: 'Block 12 Lot 8 Sierra Madre St',
      city: 'Quezon City',
      province: 'Metro Manila',
      zip: '1105',
    },
    items: [
      {
        id: 'prod-008',
        title: 'Waterproof Compression Dry Bag 20L',
        price: 890,
        quantity: 2,
        size: 'One Size',
        color: 'Signal Orange',
        imageSrc:
          'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80',
        category: 'gear',
      },
    ],
    subtotal: 1780,
    shippingFee: 150,
    totalAmount: 1930,
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'pending',
    timeline: [
      { label: 'Order Confirmed', time: 'Nov 13, 08:15 PM', done: true },
      { label: 'Packing at Ahon Ridge Center', time: 'In Queue', done: true, current: true },
      { label: 'Handover to Courier', time: 'Pending', done: false },
      { label: 'Out for Delivery', time: 'Pending', done: false },
      { label: 'Package Delivered', time: 'Pending', done: false },
    ],
  },
  {
    id: 'AHN-7980',
    createdAt: '2026-11-08T11:00:00Z',
    status: 'delivered',
    courier: 'LBC Express',
    trackingNumber: 'LBC-MNL-210943',
    estimatedDelivery: 'Delivered on Nov 10, 2026',
    deliveryMethod: 'Provincial Door-to-Door',
    shippingAddress: {
      firstName: 'Dianne',
      lastName: 'Reyes',
      phone: '0917-234-5678',
      address: 'Poblacion Sagada',
      city: 'Sagada',
      province: 'Mountain Province',
      zip: '2619',
    },
    items: [
      {
        id: 'prod-006',
        title: 'Titanium Single-Wall Mug 450ml',
        price: 1250,
        quantity: 1,
        size: 'One Size',
        color: 'Raw Titanium',
        imageSrc:
          'https://images.unsplash.com/photo-1517865288-978fcb780652?auto=format&fit=crop&w=900&q=80',
        category: 'gear',
      },
    ],
    subtotal: 1250,
    shippingFee: 250,
    totalAmount: 1500,
    paymentMethod: 'GCash',
    paymentStatus: 'paid',
    timeline: [
      { label: 'Order Confirmed', time: 'Nov 08, 11:00 AM', done: true },
      { label: 'Packed & Weighed', time: 'Nov 08, 01:20 PM', done: true },
      { label: 'Dispatched via LBC', time: 'Nov 09, 08:10 AM', done: true },
      { label: 'Out for Delivery in Sagada', time: 'Nov 10, 09:30 AM', done: true },
      { label: 'Delivered & Received', time: 'Nov 10, 02:15 PM', done: true, current: true },
    ],
  },
]

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: INITIAL_MOCK_ORDERS,

      addOrder: (orderData) => {
        const orderId = `AHN-${Math.floor(1000 + Math.random() * 9000)}`
        const dateStr = new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
        const timeStr = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })

        const courier =
          orderData.deliveryMethod === 'metro-express'
            ? 'Ahon Express Courier'
            : orderData.deliveryMethod === 'provincial'
              ? 'LBC Express'
              : 'J&T Express'

        const trackingNumber = `${courier.slice(0, 3).toUpperCase()}-PH-${Math.floor(100000 + Math.random() * 900000)}`

        const newOrder = {
          id: orderId,
          createdAt: new Date().toISOString(),
          status: 'to_pack',
          courier,
          trackingNumber,
          estimatedDelivery:
            orderData.deliveryMethod === 'metro-express'
              ? 'Next Business Day'
              : '3–5 Business Days',
          deliveryMethod: orderData.deliveryMethodLabel || 'Standard Delivery',
          shippingAddress: orderData.shippingAddress,
          items: orderData.items,
          subtotal: orderData.subtotal,
          shippingFee: orderData.shippingFee,
          totalAmount: orderData.totalAmount,
          paymentMethod: orderData.paymentMethod || 'Cash on Delivery (COD)',
          paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
          timeline: [
            { label: 'Order Confirmed', time: `${dateStr}, ${timeStr}`, done: true },
            { label: 'Queued at Warehouse', time: 'Preparing Pack', done: true, current: true },
            { label: 'Courier Handover', time: 'Pending', done: false },
            { label: 'Out for Delivery', time: 'Pending', done: false },
            { label: 'Package Delivered', time: 'Pending', done: false },
          ],
        }

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }))

        return newOrder
      },

      /**
       * Interactive simulator: Cycle status forward
       * to_pack -> to_ship -> to_deliver -> delivered
       */
      advanceStatus: (orderId) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id !== orderId) return order

            const nextMap = {
              to_pack: 'to_ship',
              to_ship: 'to_deliver',
              to_deliver: 'delivered',
              delivered: 'to_pack',
            }
            const nextStatus = nextMap[order.status] || 'to_pack'

            const updatedTimeline = order.timeline.map((step, idx) => {
              const stepIndex = ORDER_STATUSES[nextStatus]?.stepIndex ?? 1
              if (idx < stepIndex) {
                return { ...step, done: true, current: false }
              } else if (idx === stepIndex) {
                return { ...step, done: true, current: true, time: 'Just now' }
              } else {
                return { ...step, done: false, current: false }
              }
            })

            return {
              ...order,
              status: nextStatus,
              timeline: updatedTimeline,
            }
          }),
        }))
      },

      updateOrderStatus: (orderId, newStatus) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
        }))
      },

      cancelOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' } : o)),
        }))
      },

      getActiveCount: () => {
        return get().orders.filter((o) => ['to_pack', 'to_ship', 'to_deliver'].includes(o.status)).length
      },
    }),
    {
      name: 'ahon-orders',
      partialize: (state) => ({ orders: state.orders }),
    },
  ),
)

export default useOrderStore

