"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { useTheme } from "@/app/store/useTheme";

interface Props {
  children: ReactNode;
  back?: boolean;
  path?: string;
  toggleTheme?: boolean;
}

export default function NavBtn({ children, back, path, toggleTheme }: Props) {
  const { themeToggle } = useTheme();

  const router = useRouter();
  const handleClick = async () => {
    if (toggleTheme) themeToggle();
    else if (back) router.back();
    else router.push(path!);
  };

  return (
    <Button variant={"outline"} onClick={handleClick}>
      {children}
    </Button>
  );
}
