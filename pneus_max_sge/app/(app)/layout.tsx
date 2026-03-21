import { Header } from "@/app/components/organisms/Header";
import { Footer } from "@/app/components/organisms/Footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
