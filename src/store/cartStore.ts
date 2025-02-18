import { create } from "zustand";
import type { Product } from "@prisma/client";
import { persist } from "zustand/middleware";

type CheckoutItem = Product & {
  quantity: number;
  size?: "small" | "medium" | "large";
};

type CartState = {
  items: CheckoutItem[];
  addItem: (item: CheckoutItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
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

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
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
