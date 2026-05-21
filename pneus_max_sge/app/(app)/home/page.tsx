"use client";

import { useCallback, useEffect, useState } from "react";
import { Pneu } from "@/app/lib/types";
import { ProductTable } from "@/app/components/organisms/ProductTable";
import { Input } from "@/app/components/atoms/Input";
import { Search } from "lucide-react";

function normalizePneuResponse(raw: any): Pneu {
  return {
    ...raw,
    indice_peso: raw.indice_peso ?? raw.indicePeso ?? "",
    indice_velocidade: raw.indice_velocidade ?? raw.indiceVelocidade ?? "",
    tipo_construcao: raw.tipo_construcao ?? raw.tipoConstrucao ?? "",
    tipo_terreno: raw.tipo_terreno ?? raw.tipoTerreno ?? "",
  } as Pneu;
}

export default function HomePage() {
  const [pneus, setPneus] = useState<Pneu[]>([]);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");

  const carregarPneus = useCallback(() => {
    fetch("/api/pneus", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar pneus");
        }

        return response.json();
      })
      .then((data) => {
        setPneus((data as any[]).map(normalizePneuResponse));
        setErro("");
      })
      .catch((error) => {
        console.error(error);
        setErro("Nao foi possivel carregar os pneus.");
      });
  }, []);

  useEffect(() => {
    carregarPneus();

    const recarregarQuandoVoltar = () => carregarPneus();
    window.addEventListener("focus", recarregarQuandoVoltar);
    window.addEventListener("pageshow", recarregarQuandoVoltar);

    return () => {
      window.removeEventListener("focus", recarregarQuandoVoltar);
      window.removeEventListener("pageshow", recarregarQuandoVoltar);
    };
  }, [carregarPneus]);

  const pneusFiltrados = pneus.filter(
    (p) =>
      p.modelo.toLowerCase().includes(busca.toLowerCase()) ||
      p.marca.toLowerCase().includes(busca.toLowerCase()),
  );

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
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-lg border bg-card shadow-md mt-2 mb-1">
        {erro ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-red-500">{erro}</p>
          </div>
        ) : pneusFiltrados.length > 0 ? (
          <ProductTable pneus={pneusFiltrados} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Nenhum pneu encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
