"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowLeft, MessageSquareCode, ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  description: string;
  actions: boolean;
  priAction?: () => void;
  priTitle?: string;
  secAction?: () => void;
  secTitle?: string;
}

export default function EReviews({
  title,
  description,
  actions,
  priAction,
  priTitle,
  secAction,
  secTitle,
}: Props) {
  const router = useRouter();
  return (
    <Empty className="bg-background border border-border rounded-2xl">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <MessageSquareCode />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row gap-4 justify-center items-center">
        <Button onClick={priAction}>
          <ArrowLeft /> {priTitle}
        </Button>
        <Button onClick={secAction} variant={"secondary"}>
          <ShoppingBasket />
          {secTitle}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
