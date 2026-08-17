"use client";
import { useTheme } from "@/app/store/useTheme";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
  children: ReactNode;
  back?: boolean;
  path?: string;
  toggleTheme?: boolean;
  tooltip?: string;
  badge?: boolean;
}

export default function NavBtn({
  children,
  back,
  path,
  tooltip,
  toggleTheme,
  badge,
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
          <Button
            variant={"outline"}
            onClick={handleClick}
            className={"relative"}
          >
            {children}
            {badge && (
              <div className="bg-destructive w-1.5 aspect-square rounded-full absolute top-2 right-2" />
            )}
          </Button>
        }
      ></TooltipTrigger>
      {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
    </Tooltip>
  );
}
