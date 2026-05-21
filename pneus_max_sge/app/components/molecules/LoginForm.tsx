"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "../atoms/Button";
import { FormField } from "./FormField";

const loginSchema = z.object({
  usuario: z.string().min(3, "Informe seu usuário."),
  senha: z.string().min(6, "A senha deve ter ao menos 6 caracteres."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (_data: LoginFormData) => {
    router.push("/home");
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
        hideLabel
        {...register("usuario")}
      />
      <FormField
        id="senha"
        label="Senha"
        type="password"
        placeholder="Senha"
        className="bg-white/90"
        error={errors.senha?.message}
        hideLabel
        {...register("senha")}
      />
      <Button type="submit" disabled={isSubmitting} className="mt-2">
        Entrar
      </Button>
    </form>
  );
}
