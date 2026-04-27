import { Pneu } from "./types";

const API_BASE_URL = "http://localhost:3001";

async function getPneusData(): Promise<Pneu[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/pneus`,{
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error("Failed to fetch pneus");
    }
    const pneus = await response.json();
    return pneus as Pneu[];
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
    const response = await fetch(`${API_BASE_URL}/pneus/${id}`,{
      cache: 'no-store',
    });
    if (!response.ok) {
      return undefined;
    }
    const pneu = await response.json();
    return pneu as Pneu;
  } catch (error) {
    console.error("Erro ao buscar pneu por ID:", error);
    return undefined;
  }
}
