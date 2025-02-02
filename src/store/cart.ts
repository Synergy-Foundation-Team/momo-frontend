import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartStore {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.id === item.id)

        if (existingItem) {
          const updatedItems = currentItems.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          )
          set((state) => ({
            items: updatedItems,
            totalItems: state.totalItems + (item.quantity || 1),
            totalPrice: state.totalPrice + item.price * (item.quantity || 1),
          }))
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: item.quantity || 1 }],
            totalItems: state.totalItems + (item.quantity || 1),
            totalPrice: state.totalPrice + item.price * (item.quantity || 1),
          }))
        }
      },
      removeItem: (itemId) => {
        const itemToRemove = get().items.find((i) => i.id === itemId)
        if (!itemToRemove) return

        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
          totalItems: state.totalItems - itemToRemove.quantity,
          totalPrice: state.totalPrice - itemToRemove.price * itemToRemove.quantity,
        }))
      },
      updateQuantity: (itemId, quantity) => {
        const currentItems = get().items
        const item = currentItems.find((i) => i.id === itemId)
        if (!item) return

        const quantityDiff = quantity - item.quantity
        const updatedItems = currentItems.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        )

        set((state) => ({
          items: updatedItems,
          totalItems: state.totalItems + quantityDiff,
          totalPrice: state.totalPrice + item.price * quantityDiff,
        }))
      },
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        })
      },
    }),
    {
      name: 'cart-storage',
      skipHydration: true,
    }
  )
)
