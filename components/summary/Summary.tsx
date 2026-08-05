import { Summary } from "@/lib/generated/prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Sparkles } from "lucide-react";

export default function SummaryBox({
  id,
  productId,
  content,
  createdAt,
  expiresAt,
}: Summary) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className=" text-2xl font-bold">Review Summary</CardTitle>
        <CardDescription className="flex items-center gap-2 text-lg">
          <Sparkles size={18} />
          Generated with AI -{" "}
          <span className="text-sm"> {createdAt.toLocaleDateString()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent >
        <p className="text-lg">{content}</p>
      </CardContent>
    </Card>
  );
}
