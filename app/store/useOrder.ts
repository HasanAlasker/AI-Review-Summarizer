import { OrderStatus } from "@/lib/generated/prisma/enums";
import axios from "axios";
import { create } from "zustand";

interface OrderItem {
  quantity: number;
  price: number;
  product: {
    name: string;
    images: { url: string; isPrimary: boolean }[];
  };
}

interface Order {
  userName: string;
  phone: string;
  street: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
}

export interface OrderStore {
  orders: Order[];
  status: "idle" | "loading" | "syncing" | "error";
  hasHydrated: boolean;

  hydrate: () => Promise<void>;
  reset: () => void;
  updateStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getOrder: (orderId: string) => OrderItem | undefined;
  countOrders: () => number;
}

export const useOrder = create<OrderStore>()((set, get) => ({
  orders: [],
  status: "idle",
  hasHydrated: false,

  hydrate: async () => {
    set({ status: "loading" });
    try {
      const res = await axios.get("/api/admin/orders");
      if (res.status !== 200) throw new Error("Failed to load orders");
      set({ orders: res.data ?? [], status: "idle", hasHydrated: true });
    } catch (error) {
      console.error("Orders hydration failed:", error);
      set({ status: "error", hasHydrated: true });
    }
  },
  reset: () => {
    set({ orders: [], status: "idle", hasHydrated: false });
  },
  updateStatus: async () => {},
  getOrder: () => {},
  countOrders: () => {
    return get().orders.map((o) => o.status === "PENDING").length;
  },
}));
