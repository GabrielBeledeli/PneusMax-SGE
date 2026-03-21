"use client";

import { ProductForm } from "@/app/components/organisms/ProductForm";

export default function CadastroPage() {
  const handleFormSubmit = (formData: FormData) => {
    console.log("Formulário enviado. Dados:", Object.fromEntries(formData.entries()));
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold">Cadastrar Novo Produto</h1>
      <ProductForm onSubmit={handleFormSubmit} />
    </div>
  );
}
