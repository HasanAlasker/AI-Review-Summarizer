import NavBar from "@/components/general/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-10 lg:gap-15">
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
