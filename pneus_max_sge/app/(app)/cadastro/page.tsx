"use client";

import ProductForm from "@/app/components/organisms/ProductForm";

export default function CadastroPage() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold">Cadastrar Novo Produto</h1>
      <ProductForm/>
    </div>
  );
}
