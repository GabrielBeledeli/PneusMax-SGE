"use client";

import { Pneu } from "@/app/lib/types";
import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";

interface ProductFormProps {
  initialData?: Pneu;
  onSubmit: (formData: FormData) => void;
}

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const formAction = (formData: FormData) => {
    onSubmit(formData);
  };

  return (
    <form action={formAction} className="space-y-6 rounded-lg bg-card p-6 shadow-md border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormField label="Marca" id="marca" defaultValue={initialData?.marca} required />
        <FormField label="Modelo" id="modelo" defaultValue={initialData?.modelo} required />
        <FormField label="Medida" id="medida" defaultValue={initialData?.medida} required />
        <FormField label="Largura" id="largura" defaultValue={initialData?.largura} required />
        <FormField label="Perfil" id="perfil" defaultValue={initialData?.perfil} required />
        <FormField label="Aro" id="aro" defaultValue={initialData?.aro} required />
        <FormField label="Índice de Peso" id="indice_peso" defaultValue={initialData?.indice_peso} required />
        <FormField label="Índice de Velocidade" id="indice_velocidade" defaultValue={initialData?.indice_velocidade} required />
        <FormField label="Tipo de Construção" id="tipo_construcao" defaultValue={initialData?.tipo_construcao} required />
        <FormField label="Tipo de Terreno" id="tipo_terreno" defaultValue={initialData?.tipo_terreno} required />
        <FormField label="Desenho" id="desenho" defaultValue={initialData?.desenho} required />
        <FormField label="Preço" id="preco" type="number" step="0.01" defaultValue={initialData?.preco} required />
        <FormField label="Quantidade" id="quantidade" type="number" defaultValue={initialData?.quantidade} required />
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit" className="w-full md:w-auto">
          {initialData ? "Salvar Alterações" : "Cadastrar Produto"}
        </Button>
      </div>
    </form>
  );
}
