import { Pneu } from "@/app/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../atoms/Table";
import { Button } from "../atoms/Button";
import Link from "next/link";

interface ProductTableProps {
  pneus: Pneu[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function ProductTable({ pneus }: ProductTableProps) {
  return (
    <Table className="min-w-full">
      <TableHeader className="sticky top-0 bg-card z-10">
        <TableRow className="border-b-border">
          <TableHead className="text-muted-foreground">ID</TableHead>
          <TableHead className="text-muted-foreground">Marca</TableHead>
          <TableHead className="text-muted-foreground">Modelo</TableHead>
          <TableHead className="text-muted-foreground">Medida</TableHead>
          <TableHead className="text-muted-foreground">Largura</TableHead>
          <TableHead className="text-muted-foreground">Perfil</TableHead>
          <TableHead className="text-muted-foreground">Aro</TableHead>
          <TableHead className="text-muted-foreground">Índice Peso</TableHead>
          <TableHead className="text-muted-foreground">Índice Velocidade</TableHead>
          <TableHead className="text-muted-foreground">Construção</TableHead>
          <TableHead className="text-muted-foreground">Terreno</TableHead>
          <TableHead className="text-muted-foreground">Desenho</TableHead>
          <TableHead className="text-muted-foreground">Preço</TableHead>
          <TableHead className="text-muted-foreground">Qtd.</TableHead>
          <TableHead className="text-right text-muted-foreground">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pneus.map((pneu) => (
          <TableRow key={pneu.id} className="border-b-border/50">
            <TableCell className="font-medium">{pneu.id}</TableCell>
            <TableCell>{pneu.marca}</TableCell>
            <TableCell>{pneu.modelo}</TableCell>
            <TableCell>{pneu.medida}</TableCell>
            <TableCell>{pneu.largura}</TableCell>
            <TableCell>{pneu.perfil}</TableCell>
            <TableCell>{pneu.aro}</TableCell>
            <TableCell>{pneu.indice_peso}</TableCell>
            <TableCell>{pneu.indice_velocidade}</TableCell>
            <TableCell>{pneu.tipo_construcao}</TableCell>
            <TableCell>{pneu.tipo_terreno}</TableCell>
            <TableCell>{pneu.desenho}</TableCell>
            <TableCell>{formatCurrency(pneu.preco)}</TableCell>
            <TableCell>{pneu.quantidade}</TableCell>
            <TableCell className="flex justify-end gap-2">
              <Link href={`/editar/${pneu.id}`}>
                <Button className="w-auto bg-blue-600 px-3 py-1 text-sm hover:bg-blue-700 whitespace-nowrap">Editar</Button>
              </Link>
              <Button className="w-auto bg-red-600 px-3 py-1 text-sm hover:bg-red-700 whitespace-nowrap">Excluir</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
