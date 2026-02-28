import { LoginCard } from "./components/organisms/LoginCard";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: "url('/assets/background_login.jpg')",
        }}
      />

      <div className="absolute inset-0 z-0 bg-black/40" />

      <main className="relative z-10 flex w-full items-center justify-center p-4">
        <LoginCard />
      </main>
    </div>
  );
}
