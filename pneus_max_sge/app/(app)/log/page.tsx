"use client";

import { useEffect, useState } from "react";
import { getLog, clearLog, LogEntry, LogAction } from "@/app/lib/logger";
import { Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/app/components/atoms/Button";
import { cn } from "@/app/lib/utils";

const ACTION_LABELS: Record<LogAction, string> = {
  CADASTRO: "Cadastro",
  EDICAO: "Edição",
  EXCLUSAO: "Exclusão",
};

const ACTION_STYLES: Record<LogAction, string> = {
  CADASTRO: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  EDICAO: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  EXCLUSAO: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(iso));
}

export default function LogPage() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<LogAction | "TODOS">("TODOS");

  const load = () => setEntries(getLog());

  useEffect(() => {
    load();
  }, []);

  const handleClear = () => {
    if (!confirm("Deseja apagar todo o histórico de atividades?")) return;
    clearLog();
    setEntries([]);
  };

  const filtered =
    filter === "TODOS" ? entries : entries.filter((e) => e.action === filter);

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Log de Atividades</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={load}
            className="w-auto px-3 py-2 bg-transparent border border-border text-foreground hover:bg-muted"
            title="Atualizar"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleClear}
            className="w-auto px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm"
          >
            <Trash2 className="h-4 w-4 mr-1 inline" />
            Limpar Log
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {(["TODOS", "CADASTRO", "EDICAO", "EXCLUSAO"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
              filter === f
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-foreground border-border hover:bg-muted"
            )}
          >
            {f === "TODOS" ? "Todos" : ACTION_LABELS[f]}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="rounded-lg border bg-card shadow overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
            <p className="text-base">Nenhuma atividade registrada.</p>
            <p className="text-sm">
              Ações de cadastro, edição e exclusão aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
                      ACTION_STYLES[entry.action]
                    )}
                  >
                    {ACTION_LABELS[entry.action]}
                  </span>
                  <span className="text-sm text-foreground">
                    {entry.descricao}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDate(entry.timestamp)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Exibindo {filtered.length} de {entries.length} registro
        {entries.length !== 1 ? "s" : ""}.
      </p>
    </div>
  );
}
