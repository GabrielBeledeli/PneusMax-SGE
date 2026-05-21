import { PartialType } from '@nestjs/swagger';
import { CreatePneuDto } from './create-pneu.dto';

export class UpdatePneuDto extends PartialType(CreatePneuDto) {}
