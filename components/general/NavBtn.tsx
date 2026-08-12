"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { useTheme } from "@/app/store/useTheme";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
  children: ReactNode;
  back?: boolean;
  path?: string;
  toggleTheme?: boolean;
  tooltip?: string;
}

export default function NavBtn({
  children,
  back,
  path,
  tooltip,
  toggleTheme,
}: Props) {
  const { themeToggle } = useTheme();

  const router = useRouter();
  const handleClick = async () => {
    if (toggleTheme) themeToggle();
    else if (back) router.back();
    else router.push(path!);
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant={"outline"} onClick={handleClick}>
            {children}
          </Button>
        }
      ></TooltipTrigger>
      {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
    </Tooltip>
  );
}
