"use client";
import { ButtonGroup } from "@/components/ui/button-group";
import { Home, Moon, Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

const HIDE_BACK_ON = ["/products"];
export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="flex w-full m-auto justify-between py-4 lg:py-8 top-0 right-0 left-0 sticky bg-background/50 backdrop-blur-md ">
      <ButtonGroup>
        <Button variant={"outline"} onClick={() => router.push("/")}>
          <Home />
        </Button>
        {!HIDE_BACK_ON.includes(pathname) && (
          <Button variant={"outline"} onClick={() => router.back()}>
            <Undo2 />
          </Button>
        )}
      </ButtonGroup>
      <Button variant={"outline"}>
        <Moon />
      </Button>
    </nav>
  );
}
