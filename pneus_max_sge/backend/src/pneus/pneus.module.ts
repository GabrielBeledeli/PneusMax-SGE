import { Module } from '@nestjs/common';
import { PneusService } from './pneus.service';
import { PneusController } from './pneus.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PneusService, PrismaService],
  controllers: [PneusController],
})
export class PneusModule {}
