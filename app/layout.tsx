import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
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
  title: { default: "Review Sum", template: "%s | Review Sum" },
  description:
    "Instead of scrolling through pages of reviews, get the last ten distilled into a single, honest summary in seconds.",
  themeColor: "#0f172a",
  
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
        <main
          className="min-h-full flex flex-col max-w-6xl m-auto py-10 lg:py-20 px-5 lg:px-10"
          style={{ minHeight: "100svh" }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
