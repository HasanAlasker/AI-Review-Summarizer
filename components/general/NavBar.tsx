"use client";
import { useTheme } from "@/app/store/useTheme";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  LogOut,
  Moon,
  ShoppingCart,
  Store,
  Sun,
  Undo2,
  WalletCards,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavBtn from "./NavBtn";

const HIDE_BACK_ON = ["/products", "/"];

export default function NavBar() {
  const isDark = useTheme((state) => state.isDark);
  const pathname = usePathname();

  const { data: session, status } = useSession();
  console.log(session?.user!.role);

  return (
    <nav className="z-50 flex w-full mx-auto justify-between py-4 lg:py-8 top-0 right-0 left-0 sticky bg-background/50 backdrop-blur-md self-start h-fit">
      <ButtonGroup>
        <NavBtn path="/products" children={<Store />} />

        {!HIDE_BACK_ON.includes(pathname) && (
          <NavBtn back children={<Undo2 />} />
        )}
      </ButtonGroup>

      <ButtonGroup>
        {status === "unauthenticated" && (
          <NavBtn path="/api/auth/signin" children={"Sign in"} />
        )}
        {session?.user.role === "user" && (
          <NavBtn path="/cart" children={<ShoppingCart />} />
        )}
        {session?.user.role === "admin" && (
          <NavBtn path="/orders" children={<WalletCards />} />
        )}

        <NavBtn toggleTheme children={!isDark ? <Moon /> : <Sun />} />
        {status === "authenticated" && (
          <NavBtn path="/api/auth/signout" children={<LogOut color="red" />} />
        )}
      </ButtonGroup>
    </nav>
  );
}
