"use client";
import { useCart } from "@/app/store/useCart";
import { useOrder } from "@/app/store/useOrder";
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
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavBtn from "./NavBtn";
import { ProfileNavBtn } from "./ProfileNavBtn";

export default function NavBar() {
  const isDark = useTheme((state) => state.isDark);
  const pathname = usePathname();

  const callbackUrl = encodeURIComponent(pathname);

  const { data: session, status } = useSession();
  const countItems = useCart((s) => s.totalItems);
  const cartItems = useCart((s) => s.items);
  const [items, setItems] = useState(countItems());

  const ordersInStore = useOrder((s) => s.orders);
  const countOrders = useOrder((s) => s.countOrders);
  const [orders, setOrders] = useState(0);

  const isUser = session?.user.role === "user";
  const isAdmin = session?.user.role === "admin";

  useEffect(() => {
    if (isUser) setItems(countItems);
  }, [cartItems]);

  useEffect(() => {
    if (isAdmin) setOrders(countOrders);
  }, [ordersInStore, session]);

  const SignOutBtn = () => {
    return isUser ? (
      <ProfileNavBtn />
    ) : (
      <NavBtn
        path="/api/auth/signout"
        children={<LogOut color="red" />}
        tooltip="Sign out"
      />
    );
  };
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
        {isUser && (
          <NavBtn
            path="/cart"
            children={<ShoppingCart />}
            tooltip={`My cart ${items > 0 ? "(" + items + ")" : ""}`}
            badge={items > 0}
          />
        )}
        {isAdmin && (
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
        {status === "authenticated" && <SignOutBtn />}
      </ButtonGroup>
    </nav>
  );
}
