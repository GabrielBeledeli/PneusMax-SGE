import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PneusService } from './pneus.service';
import { CreatePneuDto } from './dto/create-pneu.dto';
import { UpdatePneuDto } from './dto/update-pneu.dto';
import { PneuResponseDto } from './dto/pneu-response.dto';

@ApiTags('Pneus')
@Controller('pneus')
export class PneusController {
  constructor(private readonly pneusService: PneusService) {}

  @ApiOperation({ summary: 'Cadastra um pneu' })
  @ApiCreatedResponse({ type: PneuResponseDto })
  @Post()
  create(@Body() createPneuDto: CreatePneuDto) {
    return this.pneusService.create(createPneuDto);
  }

  @ApiOperation({ summary: 'Lista todos os pneus' })
  @ApiOkResponse({ type: PneuResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.pneusService.findAll();
  }

  @ApiOperation({ summary: 'Busca um pneu pelo ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: PneuResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pneusService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualiza um pneu pelo ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: PneuResponseDto })
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePneuDto: UpdatePneuDto) {
    return this.pneusService.update(+id, updatePneuDto);
  }

  @ApiOperation({ summary: 'Remove um pneu pelo ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: PneuResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pneusService.remove(+id);
  }
}
