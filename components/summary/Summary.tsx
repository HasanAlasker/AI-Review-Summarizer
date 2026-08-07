import { Summary } from "@/lib/generated/prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

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
        <CardTitle className=" text-xl font-bold">Review Summary</CardTitle>
        <CardDescription className="flex items-center gap-2 text-Pmd">
          <Sparkles size={18} />
          Generated with AI -{" "}
          <span className="text-sm"> {new Date(createdAt).toLocaleDateString()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </CardContent>
    </Card>
  );
}
