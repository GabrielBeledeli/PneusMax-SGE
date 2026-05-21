export type LogAction = "CADASTRO" | "EDICAO" | "EXCLUSAO";

export interface LogEntry {
  id: string;
  action: LogAction;
  descricao: string;
  timestamp: string;
}

const LOG_KEY = "pneusmax_log";

export function getLog(): LogEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOG_KEY);
    return raw ? (JSON.parse(raw) as LogEntry[]) : [];
  } catch {
    return [];
  }
}

export function addLog(action: LogAction, descricao: string): void {
  if (typeof window === "undefined") return;
  const entry: LogEntry = {
    id: crypto.randomUUID(),
    action,
    descricao,
    timestamp: new Date().toISOString(),
  };
  const entries = getLog();
  entries.unshift(entry);
  localStorage.setItem(LOG_KEY, JSON.stringify(entries.slice(0, 200)));
}

export function clearLog(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOG_KEY);
}
