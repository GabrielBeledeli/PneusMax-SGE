import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePneuDto {
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

  @ApiPropertyOptional({ example: '91' })
  indicePeso?: string;

  @ApiPropertyOptional({ example: 'V' })
  indiceVelocidade?: string;

  @ApiPropertyOptional({ example: 'Radial' })
  tipoConstrucao?: string;

  @ApiPropertyOptional({ example: 'Urbano' })
  tipoTerreno?: string;

  @ApiPropertyOptional({
    description: 'Alias legado para indicePeso.',
    example: '91',
  })
  indice_peso?: string;

  @ApiPropertyOptional({
    description: 'Alias legado para indiceVelocidade.',
    example: 'V',
  })
  indice_velocidade?: string;

  @ApiPropertyOptional({
    description: 'Alias legado para tipoConstrucao.',
    example: 'Radial',
  })
  tipo_construcao?: string;

  @ApiPropertyOptional({
    description: 'Alias legado para tipoTerreno.',
    example: 'Urbano',
  })
  tipo_terreno?: string;

  @ApiProperty({ example: 'Assimetrico' })
  desenho: string;

  @ApiProperty({ example: 429.9 })
  preco: number;

  @ApiProperty({ example: 12 })
  quantidade: number;
}
