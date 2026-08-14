import axios from "axios";
import { create } from "zustand";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    name: string;
    category: string;
    price: number;
    discountPrice?: number;
    image?: string | null; // only the thumbnail
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
  updateQuantity: (productId: string, quantity?: number) => Promise<void>;
  clearCart: () => Promise<void>;

  totalItems: () => number;
  totalPrice: () => number;
  getItem: (productId: string) => CartItem | undefined;
}

interface getRes {
  items: [];
}

export const useCartStore = create<CartStore>()((set, get) => ({
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
    // called on logout to clear UI store
    set({ items: [], status: "idle", hasHydrated: false });
  },

  addItem: async () => {},
  updateQuantity: async () => {},
  removeItem: async () => {},
  clearCart: async () => {
    const removedItems = get().items;
    set({ items: [] });
    try {
      const res = await axios.delete("api/cart");
      if (res.status !== 200) throw new Error("Failed to clear cart");
    } catch (error) {
      console.log(error);
      set({ items: removedItems }); // roll back
    }
  },

  totalItems: () => {
    return get().items.reduce((sum, item) => (sum += item.quantity), 0);
  },
  totalPrice: () => {
    return get().items.reduce((total, item) => {
      const unitPrice = item.product.discountPrice ?? item.product.price;
      return total + unitPrice * item.quantity;
    }, 0);
  },
  getItem: (productId) => {
    get().items.find((item) => item.productId === productId);
  },
}));
