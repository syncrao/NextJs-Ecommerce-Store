"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  productId: string;
  inventoryId: string;
  name: string;
  price: number;
  image?: string;
  color: string;
  size: string;
  qty: number;
};

type CartState = {
  cart: CartItem[];

  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (inventoryId: string) => void;
  increaseQty: (inventoryId: string) => void;
  decreaseQty: (inventoryId: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const exist = state.cart.find(
            (p) => p.inventoryId === item.inventoryId
          );

          if (exist) {
            return {
              cart: state.cart.map((p) =>
                p.inventoryId === item.inventoryId
                  ? { ...p, qty: p.qty + 1 }
                  : p
              ),
            };
          }

          return { cart: [...state.cart, { ...item, qty: 1 }] };
        }),

      removeFromCart: (inventoryId) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => item.inventoryId !== inventoryId
          ),
        })),

      increaseQty: (inventoryId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.inventoryId === inventoryId
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        })),

      decreaseQty: (inventoryId) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.inventoryId === inventoryId
                ? { ...item, qty: item.qty - 1 }
                : item
            )
            .filter((item) => item.qty > 0),
        })),

      clearCart: () => set({ cart: [] }),

      totalPrice: () =>
        get().cart.reduce(
          (total, item) => total + item.price * item.qty,
          0
        ),
    }),
    { name: "cart-storage" }
  )
);