import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePneuDto } from './dto/create-pneu.dto';
import { UpdatePneuDto } from './dto/update-pneu.dto';

@Injectable()
export class PneusService {
  constructor(private prisma: PrismaService) {}

  create(createPneuDto: CreatePneuDto) {
    return this.prisma.pneu.create({
      data: createPneuDto,
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
    return this.prisma.pneu.update({
      where: { id },
      data: updatePneuDto,
    });
  }

  remove(id: number) {
    return this.prisma.pneu.delete({
      where: { id },
    });
  }
}
