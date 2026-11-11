import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Global cart store — persisted to localStorage so cart items survive refreshes.
 */
const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // [{ id, title, price, category, imageSrc?, quantity, color?, size?, _key }]
      isDrawerOpen: false,

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addItem: (product) =>
        set((state) => {
          const qty = Math.max(1, product.quantity ?? 1)
          const key = `${product.id}__${product.size ?? ''}__${product.color ?? ''}`
          const existing = state.items.find((i) => i._key === key)

          if (existing) {
            return {
              items: state.items.map((i) =>
                i._key === key ? { ...i, quantity: i.quantity + qty } : i,
              ),
            }
          }
          return {
            items: [...state.items, { ...product, _key: key, quantity: qty }],
          }
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
    {
      name: 'ahon-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

export default useCartStore
