"use client";
import { useTheme } from "@/app/store/useTheme";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  CircleUser,
  Home,
  Moon,
  ShoppingCart,
  Sun,
  Undo2,
  WalletCards,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const HIDE_BACK_ON = ["/products", "/"];
const HIDE_HOME_ON = ["/"];

export default function NavBar() {
  const { isDark, themeToggle } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="z-50 flex w-full mx-auto justify-between py-4 lg:py-8 top-0 right-0 left-0 sticky bg-background/50 backdrop-blur-md self-start h-fit">
      <ButtonGroup>
        {!HIDE_HOME_ON.includes(pathname) && (
          <Button variant={"outline"} onClick={() => router.push("/")}>
            <Home />
          </Button>
        )}
        {!HIDE_BACK_ON.includes(pathname) && (
          <Button variant={"outline"} onClick={() => router.back()}>
            <Undo2 />
          </Button>
        )}
        {pathname === "/" && (
          <Button variant={"outline"} onClick={() => router.push("/products")}>
            Shop
          </Button>
        )}
      </ButtonGroup>
      <ButtonGroup>
        <Button variant={"outline"} onClick={() => router.push("/")}>
          Sign in
        </Button>
        <Button variant={"outline"} onClick={() => router.push("/cart")}>
          <ShoppingCart />
        </Button>
        <Button variant={"outline"} onClick={() => router.push("/orders")}>
          <WalletCards />
        </Button>
        <Button variant={"outline"} onClick={() => router.back()}>
          <CircleUser />
        </Button>
        <Button variant={"outline"} onClick={themeToggle}>
          {!isDark ? <Moon /> : <Sun />}
        </Button>
      </ButtonGroup>
    </nav>
  );
}
