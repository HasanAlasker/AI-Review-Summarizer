import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className=" text-2xl font-bold">
          <Skeleton width={200} />
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-lg">
          <Skeleton width={20} />
          <Skeleton width={220} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg">
          <Skeleton />
          <Skeleton width={"80%"} />
          <Skeleton />
          <Skeleton width={"50%"} />
        </p>
      </CardContent>
    </Card>
  );
}
