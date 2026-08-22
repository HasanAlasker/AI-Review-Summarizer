"use client";
import { useCart } from "@/app/store/useCart";
import { useTheme } from "@/app/store/useTheme";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  LogOut,
  Moon,
  ShoppingCart,
  Store,
  Sun,
  WalletCards,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NavBtn from "./NavBtn";
import { useOrder } from "@/app/store/useOrder";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavBar() {
  const isDark = useTheme((state) => state.isDark);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const callbackUrl = encodeURIComponent(
    `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`,
  );

  const { data: session, status } = useSession();
  const countItems = useCart((s) => s.totalItems);
  const cartItems = useCart((s) => s.items);
  const [items, setItems] = useState(countItems());

  const ordersInStore = useOrder((s) => s.orders);
  const countOrders = useOrder((s) => s.countOrders);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    if (session?.user.role === "user") setItems(countItems);
  }, [cartItems]);

  useEffect(() => {
    if (session?.user.role === "admin") setOrders(countOrders);
  }, [ordersInStore, session]);

  return (
    <nav className="z-50 flex w-full mx-auto justify-between py-4 lg:py-8 top-0 right-0 left-0 sticky bg-background/50 backdrop-blur-md self-start h-fit">
      <ButtonGroup>
        <NavBtn path="/products" children={<Store />} tooltip="Shop" />
      </ButtonGroup>

      <ButtonGroup>
        {status === "unauthenticated" && (
          <NavBtn
            path={`/api/auth/signin?callbackUrl=${callbackUrl}`}
            children={"Sign in"}
          />
        )}
        {session?.user.role === "user" && (
          <NavBtn
            path="/cart"
            children={<ShoppingCart />}
            tooltip={`My cart ${items > 0 ? "(" + items + ")" : ""}`}
            badge={items > 0}
          />
        )}
        {session?.user.role === "admin" && (
          <NavBtn
            path="/admin/orders"
            children={<WalletCards />}
            tooltip={`Orders ${orders > 0 ? "(" + orders + " pending)" : ""}`}
            badge={orders > 0}
          />
        )}

        <NavBtn
          toggleTheme
          children={!isDark ? <Moon /> : <Sun />}
          tooltip={isDark ? "Light theme" : "Dark theme"}
        />
        {status === "authenticated" && (
          <NavBtn
            path="/api/auth/signout"
            children={<LogOut color="red" />}
            tooltip="Sign out"
          />
        )}
      </ButtonGroup>
    </nav>
  );
}
