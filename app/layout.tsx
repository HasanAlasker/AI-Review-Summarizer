import AuthProvider from "@/components/auth/AuthProvider";
import LoadTheme from "@/components/general/LoadTheme";
import NavBar from "@/components/general/NavBar";
import ScrollToTop from "@/components/general/ScrollToTop";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "sonner";
import LoadOrders from "./(pages)/admin/orders/LoadOrders";
import LoadCart from "./(pages)/cart/LoadCart";
import "./globals.css";

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
  title: { default: "Matjr", template: "%s | Matjr" },
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
            <div className="min-h-svh flex flex-col gap-10 max-w-6xl min-[1600px]:max-w-7xl mx-auto px-5 lg:px-10">
              <NavBar />
              <main className="relative flex flex-col flex-1">
                {/* <div className="bg-grid-white fixed inset-0 -z-1"></div> */}
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
