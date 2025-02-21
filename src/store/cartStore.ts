import { create } from "zustand";
import type { Product } from "@prisma/client";
import { persist } from "zustand/middleware";

export type CheckoutItem = Product & {
  quantity: number;
  size?: "small" | "medium" | "large";
  downloadURL?: string | null;
};

type CartState = {
  items: CheckoutItem[];
  addItem: (item: CheckoutItem) => void;
  removeItem: (itemToRemove: CheckoutItem) => void;
  clearCart: () => void;
  updateItemQuantity: (itemToUpdate: CheckoutItem, quantity: number) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) => {
        set((state) => ({
          items: [...state.items, item],
        }));
      },

      removeItem: (itemToRemove) => {
        set((state) => ({
          items: state.items.filter((item) => item !== itemToRemove),
        }));
      },

      updateItemQuantity: (itemToUpdate, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item === itemToUpdate ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => {
        set(() => ({ items: [] }));
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
