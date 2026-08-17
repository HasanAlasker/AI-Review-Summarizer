import axios from "axios";
import { create } from "zustand";

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    name: string;
    category: { name: string; id: string };
    price: number;
    discountPrice?: number;
    images: { url: string }[];
  };
}

interface CartStore {
  items: CartItem[];
  status: "idle" | "loading" | "syncing" | "error";
  hasHydrated: boolean;

  hydrate: () => Promise<void>;
  reset: () => void;

  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;

  totalItems: () => number;
  totalPrice: () => number;
  getItem: (productId: string) => CartItem | undefined;
}

interface getRes {
  items: CartItem[];
}

export const useCart = create<CartStore>()((set, get) => ({
  items: [],
  status: "idle",
  hasHydrated: false,

  hydrate: async () => {
    set({ status: "loading" });
    try {
      const res = await axios.get<getRes>("/api/cart");
      if (res.status !== 200) throw new Error("Failed to load cart");
      set({ items: res.data.items ?? [], status: "idle", hasHydrated: true });
    } catch (error) {
      console.error("Cart hydration failed:", error);
      set({ status: "error", hasHydrated: true });
    }
  },

  reset: () => {
    set({ items: [], status: "idle", hasHydrated: false });
  },

  addItem: async (productId, quantity = 1) => {
    const prevItems = get().items;
    const existing = prevItems.find((item) => item.productId === productId);

    // optimistic update — only works cleanly for existing items;
    // new items get reconciled from the server response below
    if (existing) {
      set({
        items: prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
        status: "syncing",
      });
    } else {
      set({ status: "syncing" });
    }

    try {
      const res = await axios.post<CartItem>("/api/cart/items", {
        productId,
        quantity,
      });
      if (res.status !== 200) throw new Error("Adding item failed");

      // reconcile with server truth (handles both new and updated items)
      set((state) => {
        const alreadyThere = state.items.some(
          (item) => item.productId === productId,
        );
        return {
          items: alreadyThere
            ? state.items.map((item) =>
                item.productId === productId ? res.data : item,
              )
            : [...state.items, res.data],
          status: "idle",
        };
      });
    } catch (error) {
      console.error("Add item failed:", error);
      set({ items: prevItems, status: "error" }); // rollback
      throw error;
    }
  },

  updateQuantity: async (productId, quantity) => {
    if (!Number.isInteger(quantity) || quantity <= 0) return;

    const prevItems = get().items;
    const existing = prevItems.find((item) => item.productId === productId);
    if (!existing) return;

    set({
      items: prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
      status: "syncing",
    });

    try {
      const res = await axios.patch<CartItem>(`/api/cart/items/${productId}`, {
        quantity,
      });
      if (res.status !== 200) throw new Error("Updating quantity failed");

      set((state) => ({
        items: state.items.map((item) =>
          item.productId === productId ? res.data : item,
        ),
        status: "idle",
      }));
    } catch (error) {
      console.error("Update quantity failed:", error);
      set({ items: prevItems, status: "error" }); // rollback
    }
  },

  removeItem: async (productId) => {
    const prevItems = get().items;
    set({
      items: prevItems.filter((item) => item.productId !== productId),
      status: "syncing",
    });

    try {
      const res = await axios.delete(`/api/cart/items/${productId}`);
      if (res.status !== 200) throw new Error("Removing item failed");
      set({ status: "idle" });
    } catch (error) {
      console.error("Remove item failed:", error);
      set({ items: prevItems, status: "error" }); // rollback
    }
  },

  clearCart: async () => {
    const removedItems = get().items;
    set({ items: [], status: "syncing" });
    try {
      const res = await axios.delete("/api/cart");
      if (res.status !== 200) throw new Error("Failed to clear cart");
      set({ status: "idle" });
    } catch (error) {
      console.error("Clear cart failed:", error);
      set({ items: removedItems, status: "error" }); // rollback
    }
  },

  totalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
  totalPrice: () => {
    return get().items.reduce((total, item) => {
      const unitPrice = item.product.discountPrice ?? item.product.price;
      return total + unitPrice * item.quantity;
    }, 0);
  },
  getItem: (productId) => {
    return get().items.find((item) => item.productId === productId);
  },
}));
