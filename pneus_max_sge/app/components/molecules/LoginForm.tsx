"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { FormField } from "./FormField";

const loginSchema = z.object({
  usuario: z.string().min(3, "Informe seu usuário."),
  senha: z.string().min(6, "A senha deve ter ao menos 6 caracteres."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (_data: LoginFormData) => {
    // Autenticação a ser implementada
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4"
    >
      <FormField
        id="usuario"
        label="Usuário"
        placeholder="Usuário"
        className="bg-white/90"
        error={errors.usuario?.message}
        {...register("usuario")}
      />
      <FormField
        id="senha"
        label="Senha"
        type="password"
        placeholder="Senha"
        className="bg-white/90"
        error={errors.senha?.message}
        {...register("senha")}
      />
      <Link
        href="/home"
        onClick={(e) => {
          if (isSubmitting) e.preventDefault();
        }}
        className={cn(
          "mt-2 flex items-center justify-center rounded-md bg-primary px-4 py-3 text-base font-medium text-white transition-colors",
          "hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
      >
        Entrar
      </Link>
    </form>
  );
}
