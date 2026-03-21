"use client";

import { useState } from "react";
import { Input } from "../atoms/Input";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

export function LoginForm() {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("Funcionalidade de login em desenvolvimento.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <Input
        type="text"
        placeholder="Usuário"
        required
        className="bg-white/90"
      />
      <Input
        type="password"
        placeholder="Senha"
        required
        className="bg-white/90"
      />
      <Link
        href="/home"
        className={cn(
          "mt-2 flex items-center justify-center rounded-md bg-primary px-4 py-3 text-base font-medium text-white transition-colors",
          "hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
      >
        Entrar
      </Link>
      {error && (
        <p className="mt-2 text-center text-sm font-medium text-error">
          {error}
        </p>
      )}
    </form>
  );
}
