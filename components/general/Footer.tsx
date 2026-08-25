"use client";
import { Card, CardFooter, CardHeader } from "../ui/card";
import icon from "../../public/icon.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { MdOutlineEmail, MdOutlineWhatsapp } from "react-icons/md";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSub = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      toast.warning("Please enter a valid email!");
      return;
    }
    try {
      setLoading(true);
      console.log(email);
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong, try later!");
    } finally {
      setLoading(false);
    }
  };

  if (pathname === "/") return null;
  const year = new Date().getFullYear();
  return (
    <Card className="mt-10 md:px-10 md:py-15 md:gap-10">
      <CardHeader className="flex flex-col gap-8 items-center md:flex-row md:justify-between md:items-start md:gap-12 ">
        <div className="flex flex-col gap-5 max-w-lg md:max-w-md">
          <div className="flex flex-col gap-2 w-fit">
            <Image
              src={icon}
              alt="Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
            <h4 className="text-lg font-bold tracking-wide">Matjr</h4>
          </div>

          <p className="text-chart-3 ">
            Matjry helps anyone in Jordan open an online store in minutes no
            technical skills needed. Sell your products, manage your inventory,
            and accept payments through CliQ, all from one simple platform.
          </p>
          <div className="flex gap-3">
            <Button
              variant={"secondary"}
              size={"icon-lg"}
              className={"rounded-full"}
            >
              <MdOutlineWhatsapp />
            </Button>
            <Button
              variant={"secondary"}
              size={"icon-lg"}
              className={"rounded-full"}
            >
              <MdOutlineEmail />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-5 max-w-lg">
          <h4 className="text-lg font-bold">Stay in the loop</h4>
          <p className="text-chart-3 ">
            Get notified about new products, platform updates, and discounts. No
            spam just what matters for you.
          </p>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleSub} disabled={loading}>
            {!loading ? "Subscribe" : "Subscribing"} {loading && <Spinner />}
          </Button>
          <div className="flex gap-1 items-center">
            <Button className={"p-0"} variant={"link"}>
              Privacy Policy
            </Button>
            &
            <Button className={"p-0"} variant={"link"}>
              Terms of Service
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <Separator className={"mb-5"} />
        <p>© {year} Matjr - All rights reserved</p>
        <p className="text text-xs">
          Website developed by{" "}
          <Button variant={"link"} className={"pl-1"}>
            Alasker Technologies
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
