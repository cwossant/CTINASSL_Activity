import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Global cart store — persisted to localStorage so the cart survives a refresh.
 */
const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // [{ id, title, price, category, quantity, color?, size? }]

      addItem: (product) =>
        set((state) => {
          const key = `${product.id}__${product.size ?? ''}__${product.color ?? ''}`
          const existing = state.items.find((i) => i._key === key)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i._key === key ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            }
          }
          return { items: [...state.items, { ...product, _key: key, quantity: 1 }] }
        }),

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i._key !== key) })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i._key !== key)
              : state.items.map((i) => (i._key === key ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'ahon-cart' },
  ),
)

export default useCartStore
