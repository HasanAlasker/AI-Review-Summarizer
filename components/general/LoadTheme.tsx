"use client";
import { useTheme } from "@/app/store/useTheme";
import { useEffect } from "react";

export default function LoadTheme() {
  const loadTheme = useTheme((state) => state.loadTheme);
  useEffect(() => {
    loadTheme();
  }, []);
  return <></>;
}
