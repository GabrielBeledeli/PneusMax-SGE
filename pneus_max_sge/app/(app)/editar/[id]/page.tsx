import { getPneuById } from "@/app/lib/data";
import  ProductForm  from "@/app/components/organisms/ProductForm";
import { notFound } from "next/navigation";

export default async function EditarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramId } = await params;
  const id = parseInt(paramId, 10);

  if (isNaN(id)) {
    notFound();
  }

  const pneu = await getPneuById(id);

  if (!pneu) {
    notFound();
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold">
        Editar Produto: <span className="text-primary">{pneu.modelo} (ID: {pneu.id})</span>
      </h1>
      <ProductForm initialData={pneu} />
    </div>
  );
}
