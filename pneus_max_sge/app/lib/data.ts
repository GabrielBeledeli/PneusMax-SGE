import { promises as fs } from 'fs';
import path from 'path';
import { Pneu } from './types';

const pneusJsonPath = path.join(process.cwd(), 'app', 'pneus.json');

async function getPneusData(): Promise<Pneu[]> {
  try {
    const fileContents = await fs.readFile(pneusJsonPath, 'utf8');
    const pneus = JSON.parse(fileContents);
    return pneus as Pneu[];
  } catch (error) {
    console.error('Erro ao ler ou parsear pneus.json:', error);
    return [];
  }
}

export async function getPneus(): Promise<Pneu[]> {
  return getPneusData();
}

export async function getPneuById(id: number): Promise<Pneu | undefined> {
  const pneus = await getPneusData();
  const pneuEncontrado = pneus.find(pneu => pneu.id === id);
  return pneuEncontrado;
}
