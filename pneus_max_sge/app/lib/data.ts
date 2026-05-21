import { Pneu } from "./types";
import { API_BASE_URL } from "./constants";

function normalizePneuResponse(raw: any): Pneu {
  return {
    ...raw,
    indice_peso: raw.indice_peso ?? raw.indicePeso ?? "",
    indice_velocidade: raw.indice_velocidade ?? raw.indiceVelocidade ?? "",
    tipo_construcao: raw.tipo_construcao ?? raw.tipoConstrucao ?? "",
    tipo_terreno: raw.tipo_terreno ?? raw.tipoTerreno ?? "",
  } as Pneu;
}

async function getPneusData(): Promise<Pneu[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/pneus`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch pneus");
    }
    const pneus = await response.json();
    return (pneus as any[]).map(normalizePneuResponse);
  } catch (error) {
    console.error("Erro ao buscar pneus da API:", error);
    return [];
  }
}

export async function getPneus(): Promise<Pneu[]> {
  return getPneusData();
}

export async function getPneuById(id: number): Promise<Pneu | undefined> {
  try {
    const response = await fetch(`${API_BASE_URL}/pneus/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return undefined;
    }
    const pneu = await response.json();
    return normalizePneuResponse(pneu);
  } catch (error) {
    console.error("Erro ao buscar pneu por ID:", error);
    return undefined;
  }
}
