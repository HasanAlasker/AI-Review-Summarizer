"use client";
import { useTheme } from "@/app/store/useTheme";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  CircleUser,
  Home,
  LogOut,
  Moon,
  ShoppingCart,
  Sun,
  Undo2,
  WalletCards,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavBtn from "./NavBtn";

const HIDE_BACK_ON = ["/products", "/"];
const HIDE_HOME_ON = ["/"];

export default function NavBar() {
  const isDark = useTheme((state) => state.isDark);
  const pathname = usePathname();

  const { data: user, status } = useSession();

  return (
    <nav className="z-50 flex w-full mx-auto justify-between py-4 lg:py-8 top-0 right-0 left-0 sticky bg-background/50 backdrop-blur-md self-start h-fit">
      <ButtonGroup>
        {!HIDE_HOME_ON.includes(pathname) && (
          <NavBtn path="/" children={<Home />} />
        )}
        {!HIDE_BACK_ON.includes(pathname) && (
          <NavBtn back children={<Undo2 />} />
        )}
        {pathname === "/" && <NavBtn path="/products" children={"Shop"} />}
      </ButtonGroup>

      <ButtonGroup>
        {status === "unauthenticated" && (
          <NavBtn path="/api/auth/signin" children={"Sign in"} />
        )}
        <NavBtn path="/cart" children={<ShoppingCart />} />
        <NavBtn path="/orders" children={<WalletCards />} />

        <NavBtn toggleTheme children={!isDark ? <Moon /> : <Sun />} />
        {status === "authenticated" && (
          <NavBtn path="/api/auth/signout" children={<LogOut color="red" />} />
        )}
      </ButtonGroup>
    </nav>
  );
}
