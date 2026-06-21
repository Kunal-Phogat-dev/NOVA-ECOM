import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/mock-data";

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items;
        if (!items.find((i) => i.id === product.id)) {
          set({ items: [...items, product] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) });
      },
      hasItem: (productId) => {
        return get().items.some((i) => i.id === productId);
      },
    }),
    {
      name: "nova-wishlist-storage",
    }
  )
);
