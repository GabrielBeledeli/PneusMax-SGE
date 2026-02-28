"use client";

import { useState } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

export function LoginForm() {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // espaço reservado apra logica de login
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
      <Button type="submit" className="mt-2">
        Entrar
      </Button>
      {error && (
        <p className="mt-2 text-center text-sm font-medium text-error">
          {error}
        </p>
      )}
    </form>
  );
}
