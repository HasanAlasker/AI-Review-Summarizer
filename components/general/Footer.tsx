"use client";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineEmail, MdOutlineWhatsapp } from "react-icons/md";
import { toast } from "sonner";
import icon from "../../public/icon.png";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import { subscribe } from "@/app/actions/subscribe";

export default function Footer() {
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
      const res = await subscribe(email);
      if (res.success) {
        toast.success("You have subscribed successfully!");
        setEmail("");
      } else toast.error(res.message);
    } catch (error) {
      toast.error("Something went wrong, try later!");
    } finally {
      setLoading(false);
    }
  };

  const year = new Date().getFullYear();
  return (
    <Card className="md:px-10 md:py-15 md:gap-10">
      <CardHeader className="flex flex-col flex-1 gap-8 md:flex-row md:gap-12 lg:items-stretch">
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
            Matjr is an AI-powered e-commerce demo storefront, built to show
            what a modern shop site can look like, including an AI review
            summarizer, with more features planned. Custom features can be added
            on request.
          </p>
          <div className="flex gap-3">
            <a
              href={`https://wa.me/962776252987`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <Button
                variant={"secondary"}
                size={"icon-lg"}
                className={"rounded-full"}
              >
                <MdOutlineWhatsapp />
              </Button>
            </a>

            <a href="mailto:hasanalasker.contact@gmail.com">
              <Button
                variant={"secondary"}
                size={"icon-lg"}
                className={"rounded-full"}
              >
                <MdOutlineEmail />
              </Button>
            </a>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-5 max-w-lg lg:min-w-md lg:min-h-full">
          <div className="flex flex-col gap-5">
            <h4 className="text-lg font-bold">Stay in the loop</h4>
            <p className="text-chart-3 ">
              Get notified about new products, platform updates, and discounts.
              No spam, just what matters to you.
            </p>
            <div className="flex flex-col gap-3 items-center lg:flex-row">
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                onClick={handleSub}
                disabled={loading}
                className={"w-full lg:w-fit"}
              >
                {!loading ? "Subscribe" : "Subscribing"}{" "}
                {loading && <Spinner />}
              </Button>
            </div>
          </div>

          <div className="flex gap-1 items-center justify-self-end">
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
        <div className="text text-xs flex flex-wrap items-center justify-center">
          Website developed by{" "}
          <a target="_blank" href={"https://alasker.dev"}>
            <Button variant={"link"} className={"pl-1"}>
              Alasker Technologies
            </Button>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
