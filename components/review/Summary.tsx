import { Summary } from "@/lib/generated/prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
        <CardTitle>Review Summary</CardTitle>
        <CardDescription>Generated with AI</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
