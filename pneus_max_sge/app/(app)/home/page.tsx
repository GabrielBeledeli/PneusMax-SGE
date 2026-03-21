import { getPneus } from "@/app/lib/data";
import { ProductTable } from "@/app/components/organisms/ProductTable";
import { Input } from "@/app/components/atoms/Input";
import { Search } from "lucide-react";

export default async function HomePage() {
  const pneus = await getPneus();

  return (
    <div className="flex flex-col h-full px-4 md:px-6">
      <div className="flex-shrink-0 pt-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">Estoque de Pneus</h1>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Buscar por modelo ou marca..." 
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-lg border bg-card shadow-md mt-2 mb-1">
        {pneus.length > 0 ? (
          <ProductTable pneus={pneus} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Nenhum pneu encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
