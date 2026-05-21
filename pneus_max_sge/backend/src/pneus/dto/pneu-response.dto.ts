import { ApiProperty } from '@nestjs/swagger';

export class PneuResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Michelin' })
  marca: string;

  @ApiProperty({ example: 'Energy XM2+' })
  modelo: string;

  @ApiProperty({ example: '205/55 R16' })
  medida: string;

  @ApiProperty({ example: '205' })
  largura: string;

  @ApiProperty({ example: '55' })
  perfil: string;

  @ApiProperty({ example: 16 })
  aro: number;

  @ApiProperty({ example: '91' })
  indicePeso: string;

  @ApiProperty({ example: 'V' })
  indiceVelocidade: string;

  @ApiProperty({ example: 'Radial' })
  tipoConstrucao: string;

  @ApiProperty({ example: 'Urbano' })
  tipoTerreno: string;

  @ApiProperty({ example: 'Assimetrico' })
  desenho: string;

  @ApiProperty({ example: 429.9 })
  preco: number;

  @ApiProperty({ example: 12 })
  quantidade: number;

  @ApiProperty({ example: '2026-05-20T22:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-05-20T22:10:00.000Z' })
  updatedAt: Date;
}
