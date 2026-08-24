"use client";
import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="m-auto flex flex-col items-center justify-center gap-6 px-5 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-muted p-4">
          <FileQuestion className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => router.back()} >
          Go back
        </Button>

        <Link href="/">
          <Button variant="outline">Go home</Button>
        </Link>
      </div>
    </div>
  );
}
