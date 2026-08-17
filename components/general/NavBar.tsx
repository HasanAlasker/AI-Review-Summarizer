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

export default function NavBar() {
  const isDark = useTheme((state) => state.isDark);

  const { data: session, status } = useSession();
  const countItems = useCart((s) => s.totalItems);
  const cartItems = useCart((s) => s.items);
  const [items, setItems] = useState(countItems());

  useEffect(() => {
    setItems(countItems);
  }, [cartItems]);

  return (
    <nav className="z-50 flex w-full mx-auto justify-between py-4 lg:py-8 top-0 right-0 left-0 sticky bg-background/50 backdrop-blur-md self-start h-fit">
      <ButtonGroup>
        <NavBtn path="/products" children={<Store />} tooltip="Shop" />
      </ButtonGroup>

      <ButtonGroup>
        {status === "unauthenticated" && (
          <NavBtn path="/api/auth/signin" children={"Sign in"} />
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
            tooltip="Orders"
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
