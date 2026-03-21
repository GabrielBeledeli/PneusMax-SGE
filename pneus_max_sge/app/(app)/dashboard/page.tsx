import { getPneus } from "@/app/lib/data";
import { DashboardClient } from "@/app/components/organisms/DashboardClient";
import { DollarSign, Package, Warehouse } from "lucide-react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export default async function DashboardPage() {
  const pneus = await getPneus();

  const totalItens = pneus.reduce((acc, pneu) => acc + pneu.quantidade, 0);
  const valorTotalEstoque = pneus.reduce((acc, pneu) => acc + (pneu.preco * pneu.quantidade), 0);
  const totalTiposPneus = pneus.length;

  const pneusPorMarca = pneus.reduce((acc, pneu) => {
    acc[pneu.marca] = (acc[pneu.marca] || 0) + pneu.quantidade;
    return acc;
  }, {} as Record<string, number>);
  const dataGraficoMarcas = Object.entries(pneusPorMarca).map(([marca, quantidade]) => ({
    marca,
    quantidade,
  }));

  const pneusPorAro = pneus.reduce((acc, pneu) => {
    const aro = `Aro ${pneu.aro}`;
    acc[aro] = (acc[aro] || 0) + pneu.quantidade;
    return acc;
  }, {} as Record<string, number>);
  const dataGraficoAro = Object.entries(pneusPorAro).map(([name, value]) => ({
    name,
    value,
  }));

  const baixoEstoque = pneus.filter(pneu => pneu.quantidade < 10).sort((a, b) => a.quantidade - b.quantidade);

  return (
    <div className="space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Valor Total do Estoque</h3>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(valorTotalEstoque)}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total de Itens no Estoque</h3>
            <Package className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold">{totalItens.toLocaleString('pt-BR')}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Tipos de Pneus (SKUs)</h3>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold">{totalTiposPneus}</p>
        </div>
      </div>

      <DashboardClient 
        dataGraficoMarcas={dataGraficoMarcas} 
        dataGraficoAro={dataGraficoAro} 
      />

      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow">
        <h3 className="text-lg font-semibold mb-4">Produtos com Baixo Estoque (menos de 10)</h3>
        {baixoEstoque.length > 0 ? (
          <div className="overflow-auto max-h-64">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left font-medium text-muted-foreground">Modelo</th>
                  <th className="p-2 text-left font-medium text-muted-foreground">Marca</th>
                  <th className="p-2 text-right font-medium text-muted-foreground">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {baixoEstoque.map(pneu => (
                  <tr key={pneu.id} className="border-b">
                    <td className="p-2">{pneu.modelo}</td>
                    <td className="p-2 text-muted-foreground">{pneu.marca}</td>
                    <td className="p-2 text-right font-bold text-primary">{pneu.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum produto com baixo estoque.</p>
        )}
      </div>
    </div>
  );
}
