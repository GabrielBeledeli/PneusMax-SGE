"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pneuSchema, PneuFormData } from "../../lib/schema";
import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";

interface ProductFormProps {
  initialData?: any; 
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const [status, setStatus] = useState<"ocioso" | "carregando" | "sucesso" | "erro">("ocioso");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PneuFormData>({
    resolver: zodResolver(pneuSchema) as any,
    defaultValues: initialData || {}, 
  });

  const onSubmit = async (data: PneuFormData) => {
    setStatus("carregando");
    
    try {
      const isEdicao = !!initialData?.id;
      const url = isEdicao ? `/api/pneus/${initialData.id}` : '/api/pneus';
      const method = isEdicao ? 'PUT' : 'POST';

      const resposta = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!resposta.ok) throw new Error("Erro na API");

      setStatus("sucesso");
      
      if (!isEdicao) {
        reset(); 
      }
      
      setTimeout(() => setStatus("ocioso"), 4000); 
    } catch (error) {
      console.error(error);
      setStatus("erro");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-background p-6 md:p-8 rounded-xl w-full mx-auto shadow-lg border border-border">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
        
        {/* Usando o seu FormField e passando o register do React Hook Form */}
        <div className="flex flex-col">
          <FormField id="marca" label="Marca" placeholder="Ex: Pirelli" {...register("marca")} />
          {errors.marca && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.marca.message}</span>}
        </div>

        <div className="flex flex-col">
          <FormField id="modelo" label="Modelo" placeholder="Ex: Scorpion Verde All Season" {...register("modelo")} />
          {errors.modelo && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.modelo.message}</span>}
        </div>

        <div className="flex flex-col">
          <FormField id="medida" label="Medida" placeholder="Ex: 235/60R16" {...register("medida")} />
          {errors.medida && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.medida.message}</span>}
        </div>

        <div className="flex flex-col">
          <FormField id="largura" label="Largura" placeholder="Ex: 235mm" {...register("largura")} />
          {errors.largura && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.largura.message}</span>}
        </div>

        <div className="flex flex-col">
          <FormField id="perfil" label="Perfil" placeholder="Ex: 60%" {...register("perfil")} />
          {errors.perfil && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.perfil.message}</span>}
        </div>

        <div className="flex flex-col">
          <FormField id="aro" label="Aro" type="number" placeholder="Ex: 16" {...register("aro")} />
          {errors.aro && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.aro.message}</span>}
        </div>

        <div className="flex flex-col">
          <FormField id="indicePeso" label="Índice de Peso" placeholder="Ex: 100 - 800 kg" {...register("indicePeso")} />
          {errors.indicePeso && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.indicePeso.message}</span>}
        </div>

        <div className="flex flex-col">
          <FormField id="indiceVelocidade" label="Índice de Velocidade" placeholder="Ex: H - 210 km/h" {...register("indiceVelocidade")} />
          {errors.indiceVelocidade && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.indiceVelocidade.message}</span>}
        </div>

        <div className="flex flex-col">
          <FormField id="tipoConstrucao" label="Tipo de Construção" placeholder="Ex: Radial" {...register("tipoConstrucao")} />
          {errors.tipoConstrucao && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.tipoConstrucao.message}</span>}
        </div>

        <div className="flex flex-col">
          <FormField id="tipoTerreno" label="Tipo de Terreno" placeholder="Ex: HT" {...register("tipoTerreno")} />
          {errors.tipoTerreno && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.tipoTerreno.message}</span>}
        </div>

        <div className="flex flex-col">
          <FormField id="desenho" label="Desenho" placeholder="Ex: Assimétrico" {...register("desenho")} />
          {errors.desenho && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.desenho.message}</span>}
        </div>

        <div className="flex flex-col">
          {/* Lembrete: Preço continua como type="text" para suportar vírgula */}
          <FormField id="preco" label="Preço" type="text" placeholder="Ex: 699,90" {...register("preco")} />
          {errors.preco && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.preco.message}</span>}
        </div>

        <div className="flex flex-col">
          <FormField id="quantidade" label="Quantidade" type="number" placeholder="Ex: 14" {...register("quantidade")} />
          {errors.quantidade && <span className="text-red-500 text-xs mt-1.5 font-medium">{errors.quantidade.message}</span>}
        </div>

      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        
        <Button type="submit" disabled={status === "carregando"} className="md:w-auto px-8">
          {status === "carregando" ? "Salvando..." : (initialData?.id ? "Atualizar Pneu" : "Salvar Pneu")}
        </Button>

        {status === "sucesso" && <span className="text-green-500 font-medium">✓ {initialData?.id ? "Atualizado" : "Cadastrado"} com sucesso!</span>}
        {status === "erro" && <span className="text-red-500 font-medium">✕ Erro ao salvar. Tente novamente.</span>}
      </div>
    </form>
  );
}