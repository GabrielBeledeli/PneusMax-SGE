import { Logo } from "../atoms/Logo";
import { LoginForm } from "../molecules/LoginForm";

export function LoginCard() {
  return (
    <div className="relative z-10 flex w-full max-w-md flex-col items-center rounded-xl bg-surface-dark/90 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
      <div className="mb-8 w-full max-w-[400px]">
        <Logo src="/assets/logo3.png" alt="Logo PneusMax" />
      </div>

      <h1 className="mb-8 text-center text-xl font-medium leading-relaxed text-text-light">
        Seja bem-vindo ao sistema de gerenciamento de produtos da{" "}
        <span className="font-bold text-primary">PneusMax</span>
      </h1>

      <LoginForm />
    </div>
  );
}
