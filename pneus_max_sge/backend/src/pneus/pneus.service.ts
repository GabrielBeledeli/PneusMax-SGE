import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePneuDto } from './dto/create-pneu.dto';
import { UpdatePneuDto } from './dto/update-pneu.dto';

@Injectable()
export class PneusService {
  constructor(private prisma: PrismaService) {}

  private normalizePneuData(data: any): Record<string, unknown> {
    const normalized = {
      marca: data.marca,
      modelo: data.modelo,
      medida: data.medida,
      largura: data.largura,
      perfil: data.perfil,
      aro: data.aro,
      indicePeso: data.indicePeso ?? data.indice_peso,
      indiceVelocidade: data.indiceVelocidade ?? data.indice_velocidade,
      tipoConstrucao: data.tipoConstrucao ?? data.tipo_construcao,
      tipoTerreno: data.tipoTerreno ?? data.tipo_terreno,
      desenho: data.desenho,
      preco: data.preco,
      quantidade: data.quantidade,
    };

    return Object.fromEntries(
      Object.entries(normalized).filter(([, value]) => value !== undefined),
    );
  }

  create(createPneuDto: CreatePneuDto) {
    const data = this.normalizePneuData(
      createPneuDto,
    ) as Prisma.PneuUncheckedCreateInput;

    return this.prisma.pneu.create({
      data,
    });
  }

  findAll() {
    return this.prisma.pneu.findMany();
  }

  findOne(id: number) {
    return this.prisma.pneu.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePneuDto: UpdatePneuDto) {
    const data = this.normalizePneuData(
      updatePneuDto,
    ) as Prisma.PneuUncheckedUpdateInput;

    return this.prisma.pneu.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.pneu.delete({
      where: { id },
    });
  }
}
