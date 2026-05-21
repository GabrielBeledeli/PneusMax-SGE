"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pneuSchema, PneuFormData } from "../../lib/schema";
import { Pneu } from "../../lib/types";
import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";
import { API_BASE_URL } from "../../lib/constants";
import { addLog } from "../../lib/logger";

interface ProductFormProps {
  initialData?: Partial<Pneu>;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();

  const [status, setStatus] = useState<
    "ocioso" | "carregando" | "sucesso" | "erro"
  >("ocioso");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(pneuSchema),
    defaultValues: initialData
      ? {
          marca: initialData.marca ?? "",
          modelo: initialData.modelo ?? "",
          medida: initialData.medida ?? "",
          largura: initialData.largura ?? "",
          perfil: initialData.perfil ?? "",
          aro: initialData.aro ?? 0,
          indice_peso:
            initialData.indice_peso ?? (initialData as any).indicePeso ?? "",
          indice_velocidade:
            initialData.indice_velocidade ??
            (initialData as any).indiceVelocidade ??
            "",
          tipo_construcao:
            initialData.tipo_construcao ??
            (initialData as any).tipoConstrucao ??
            "",
          tipo_terreno:
            initialData.tipo_terreno ?? (initialData as any).tipoTerreno ?? "",
          desenho: initialData.desenho ?? "",
          preco: initialData.preco?.toString() ?? "",
          quantidade: initialData.quantidade ?? 0,
        }
      : {},
  });

  const toApiPayload = (data: PneuFormData) => {
    const {
      indice_peso,
      indice_velocidade,
      tipo_construcao,
      tipo_terreno,
      ...rest
    } = data;

    return {
      ...rest,
      indicePeso: indice_peso,
      indiceVelocidade: indice_velocidade,
      tipoConstrucao: tipo_construcao,
      tipoTerreno: tipo_terreno,
    };
  };

  const onSubmit = async (data: PneuFormData) => {
    setStatus("carregando");

    try {
      const isEdicao = !!initialData?.id;

      const url = isEdicao
        ? `${API_BASE_URL}/pneus/${initialData.id}`
        : `${API_BASE_URL}/pneus`;

      const method = isEdicao ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toApiPayload(data)),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        console.error("ERRO BACKEND:", erro);
        throw new Error("Erro na API");
      }

      if (isEdicao) {
        addLog(
          "EDICAO",
          `Pneu editado: ${data.marca} ${data.modelo} (ID: ${initialData.id})`,
        );
      } else {
        addLog(
          "CADASTRO",
          `Pneu cadastrado: ${data.marca} ${data.modelo} — ${data.medida}`,
        );
      }

      setStatus("sucesso");

      setTimeout(() => {
        router.push("/home");
        router.refresh();
      }, 500);

      reset();
    } catch (error) {
      console.error(error);
      setStatus("erro");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-background p-6 md:p-8 rounded-xl w-full mx-auto shadow-lg border border-border"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
        <FormField
          id="marca"
          label="Marca"
          placeholder="Ex: Pirelli"
          error={errors.marca?.message}
          {...register("marca")}
        />
        <FormField
          id="modelo"
          label="Modelo"
          placeholder="Ex: Scorpion Verde All Season"
          error={errors.modelo?.message}
          {...register("modelo")}
        />
        <FormField
          id="medida"
          label="Medida"
          placeholder="Ex: 235/60R16"
          error={errors.medida?.message}
          {...register("medida")}
        />
        <FormField
          id="largura"
          label="Largura"
          placeholder="Ex: 235mm"
          error={errors.largura?.message}
          {...register("largura")}
        />
        <FormField
          id="perfil"
          label="Perfil"
          placeholder="Ex: 60%"
          error={errors.perfil?.message}
          {...register("perfil")}
        />
        <FormField
          id="aro"
          label="Aro"
          type="number"
          placeholder="Ex: 16"
          error={errors.aro?.message}
          {...register("aro")}
        />
        <FormField
          id="indice_peso"
          label="Índice de Peso"
          placeholder="Ex: 100 - 800 kg"
          error={errors.indice_peso?.message}
          {...register("indice_peso")}
        />
        <FormField
          id="indice_velocidade"
          label="Índice de Velocidade"
          placeholder="Ex: H - 210 km/h"
          error={errors.indice_velocidade?.message}
          {...register("indice_velocidade")}
        />
        <FormField
          id="tipo_construcao"
          label="Tipo de Construção"
          placeholder="Ex: Radial"
          error={errors.tipo_construcao?.message}
          {...register("tipo_construcao")}
        />
        <FormField
          id="tipo_terreno"
          label="Tipo de Terreno"
          placeholder="Ex: HT"
          error={errors.tipo_terreno?.message}
          {...register("tipo_terreno")}
        />
        <FormField
          id="desenho"
          label="Desenho"
          placeholder="Ex: Assimétrico"
          error={errors.desenho?.message}
          {...register("desenho")}
        />
        <FormField
          id="preco"
          label="Preço"
          type="text"
          placeholder="Ex: 699,90"
          error={errors.preco?.message}
          {...register("preco")}
        />
        <FormField
          id="quantidade"
          label="Quantidade"
          type="number"
          placeholder="Ex: 14"
          error={errors.quantidade?.message}
          {...register("quantidade")}
        />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Button
          type="submit"
          disabled={status === "carregando"}
          className="md:w-auto px-8"
        >
          {status === "carregando"
            ? "Salvando..."
            : initialData?.id
              ? "Atualizar Pneu"
              : "Salvar Pneu"}
        </Button>
        {status === "sucesso" && (
          <span className="text-green-500 font-medium">
            ✓ {initialData?.id ? "Atualizado" : "Cadastrado"} com sucesso!
          </span>
        )}
        {status === "erro" && (
          <span className="text-red-500 font-medium">
            ✕ Erro ao salvar. Tente novamente.
          </span>
        )}
      </div>
    </form>
  );
}
