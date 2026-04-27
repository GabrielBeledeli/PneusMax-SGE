import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PneusService } from './pneus.service';
import { CreatePneuDto } from './dto/create-pneu.dto';
import { UpdatePneuDto } from './dto/update-pneu.dto';

@Controller('pneus')
export class PneusController {
  constructor(private readonly pneusService: PneusService) {}

  @Post()
  create(@Body() createPneuDto: CreatePneuDto){
    return this.pneusService.create(createPneuDto);
  }

  @Get()
  findAll() {
    return this.pneusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pneusService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePneuDto: UpdatePneuDto) {
    return this.pneusService.update(+id, updatePneuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pneusService.remove(+id);
  }
}
