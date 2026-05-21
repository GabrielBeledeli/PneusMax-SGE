"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pneu } from "@/app/lib/types";
import { API_BASE_URL } from "@/app/lib/constants";
import { addLog } from "@/app/lib/logger";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../atoms/Table";
import { Button } from "../atoms/Button";

interface ProductTableProps {
  pneus: Pneu[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getField(...values: Array<string | null | undefined>) {
  return values.find((value) => value && value.trim().length > 0) ?? "-";
}

function getSpecs(pneu: Pneu) {
  return {
    indicePeso: getField(pneu.indice_peso, (pneu as any).indicePeso),
    indiceVelocidade: getField(
      pneu.indice_velocidade,
      (pneu as any).indiceVelocidade,
    ),
    tipoConstrucao: getField(pneu.tipo_construcao, (pneu as any).tipoConstrucao),
    tipoTerreno: getField(pneu.tipo_terreno, (pneu as any).tipoTerreno),
  };
}

export function ProductTable({ pneus }: ProductTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (pneu: Pneu) => {
    if (!confirm(`Deseja excluir o pneu "${pneu.marca} ${pneu.modelo}"?`)) {
      return;
    }

    setDeletingId(pneu.id);
    try {
      const resposta = await fetch(`${API_BASE_URL}/pneus/${pneu.id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        throw new Error("Erro ao excluir");
      }

      addLog(
        "EXCLUSAO",
        `Pneu excluido: ${pneu.marca} ${pneu.modelo} - ${pneu.medida} (ID: ${pneu.id})`,
      );
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir o produto. Tente novamente.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[1120px]">
        <TableHeader className="sticky top-0 z-10 bg-card">
          <TableRow className="border-b-border">
            <TableHead className="text-muted-foreground">ID</TableHead>
            <TableHead className="text-muted-foreground">Marca</TableHead>
            <TableHead className="min-w-[380px] text-muted-foreground">
              Produto
            </TableHead>
            <TableHead className="text-muted-foreground">Medida</TableHead>
            <TableHead className="text-muted-foreground">Largura</TableHead>
            <TableHead className="text-muted-foreground">Perfil</TableHead>
            <TableHead className="text-muted-foreground">Aro</TableHead>
            <TableHead className="text-muted-foreground">Desenho</TableHead>
            <TableHead className="text-muted-foreground">Preco</TableHead>
            <TableHead className="text-muted-foreground">Qtd.</TableHead>
            <TableHead className="text-right text-muted-foreground">
              Acoes
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pneus.map((pneu) => {
            const specs = getSpecs(pneu);

            return (
              <TableRow key={pneu.id} className="border-b-border/50">
                <TableCell className="font-medium">{pneu.id}</TableCell>
                <TableCell>{pneu.marca}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{pneu.modelo}</p>
                    <p className="text-xs text-muted-foreground">
                      Peso: {specs.indicePeso} | Vel.:{" "}
                      {specs.indiceVelocidade}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Construcao: {specs.tipoConstrucao} | Terreno:{" "}
                      {specs.tipoTerreno}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{pneu.medida}</TableCell>
                <TableCell>{pneu.largura}</TableCell>
                <TableCell>{pneu.perfil}</TableCell>
                <TableCell>{pneu.aro}</TableCell>
                <TableCell>{pneu.desenho}</TableCell>
                <TableCell>{formatCurrency(pneu.preco)}</TableCell>
                <TableCell>{pneu.quantidade}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Link href={`/editar/${pneu.id}`}>
                    <Button className="w-auto whitespace-nowrap bg-blue-600 px-3 py-1 text-sm hover:bg-blue-700">
                      Editar
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(pneu)}
                    disabled={deletingId === pneu.id}
                    className="w-auto whitespace-nowrap bg-red-600 px-3 py-1 text-sm hover:bg-red-700 disabled:opacity-50"
                  >
                    {deletingId === pneu.id ? "Excluindo..." : "Excluir"}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
