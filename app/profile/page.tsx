import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info, Mail, MapPin, Phone } from "lucide-react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

function ProfileRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span className="text-sm text-foreground">
          {value?.trim() ? value : "Not provided"}
        </span>
      </div>
    </div>
  );
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const user = session.user;

  return (
    <div className="m-auto flex w-full flex-col justify-center">
      <Card>
        <CardHeader className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={user.image ?? undefined}
              alt={user.name ?? "User"}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">
              {user.name ?? "Unnamed user"}
            </CardTitle>
            <CardDescription>Your account details</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Separator />
          <div className="divide-y">
            <ProfileRow icon={Mail} label="Email" value={user.email} />
            <ProfileRow icon={Phone} label="Phone" value={user.phone} />
            <ProfileRow icon={MapPin} label="Street" value={user.street} />
          </div>

          <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Need to update your phone or street?</AlertTitle>
            <AlertDescription>
              You can update your phone number or street address when you
              confirm your next order.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamic = "force-dynamic";
