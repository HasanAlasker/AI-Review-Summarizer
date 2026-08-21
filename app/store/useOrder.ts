import { OrderStatus } from "@/lib/generated/prisma/enums";
import axios from "axios";
import { create } from "zustand";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    images: { url: string; isPrimary: boolean }[];
  };
}

interface Order {
  id: string;
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
  updateStatus: async (orderId, status) => {
    const orders = get().orders;
    set({
      orders: orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
    });
    try {
      const res = await axios.patch(`/api/admin/orders/${orderId}`, { status });
      if (res.status !== 200) throw new Error("Updating status failed");
    } catch (error) {
      set({ orders, status: "error" });
      throw error;
    }
  },
  countOrders: () => {
    return get().orders.filter((o) => o.status === "PENDING").length;
  },
}));
