"use client";

import dynamic from 'next/dynamic';

interface MarcaData {
  marca: string;
  quantidade: number;
}

interface AroData {
  name: string;
  value: number;
}

interface DashboardClientProps {
  dataGraficoMarcas: MarcaData[];
  dataGraficoAro: AroData[];
}

const PneusPorMarcaChart = dynamic(() => 
  import('@/app/components/molecules/PneusPorMarcaChart').then(mod => mod.PneusPorMarcaChart), 
  { ssr: false, loading: () => <div className="h-[350px] w-full bg-muted/50 rounded-lg" /> }
);

const PneusPorAroChart = dynamic(() => 
  import('@/app/components/molecules/PneusPorAroChart').then(mod => mod.PneusPorAroChart), 
  { ssr: false, loading: () => <div className="h-[350px] w-full bg-muted/50 rounded-lg" /> }
);

export function DashboardClient({ dataGraficoMarcas, dataGraficoAro }: DashboardClientProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow">
        <h3 className="text-lg font-semibold mb-4">Quantidade por Marca</h3>
        <PneusPorMarcaChart data={dataGraficoMarcas} />
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow">
        <h3 className="text-lg font-semibold mb-4">Distribuição por Aro</h3>
        <PneusPorAroChart data={dataGraficoAro} />
      </div>
    </div>
  );
}
