import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import LoadTheme from "@/components/general/LoadTheme";
import ScrollToTop from "@/components/general/ScrollToTop";
import NavBar from "@/components/general/NavBar";
import AuthProvider from "@/components/auth/AuthProvider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoadCart from "./cart/LoadCart";
import LoadOrders from "./admin/orders/LoadOrders";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Review Sum", template: "%s | Review Sum" },
  description:
    "Instead of scrolling through pages of reviews, get the last ten distilled into a single, honest summary in seconds.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body>
        <AuthProvider>
          <TooltipProvider>
            <div className="min-h-svh flex flex-col gap-10 max-w-6xl mx-auto pb-10 lg:pb-20 px-5 lg:px-10">
              <NavBar />
              <main className="relative flex flex-col flex-1">
                <div className="bg-grid-white fixed inset-0 -z-1"></div>
                {children}
                <LoadTheme />
                <LoadCart />
                <LoadOrders />
                <ScrollToTop />
              </main>
              <Toaster />
            </div>
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
