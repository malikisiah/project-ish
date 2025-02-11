import { create } from "zustand";
import type { Product } from "@prisma/client";
import { persist } from "zustand/middleware";

type CartState = {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
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
    }),
    {
      name: "cart-storage",
    },
  ),
);
