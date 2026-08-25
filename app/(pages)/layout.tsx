import Footer from "@/components/general/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen gap-30">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
