import { PartialType } from '@nestjs/mapped-types';
import { CreatePneuDto } from './create-pneu.dto';

export class UpdatePneuDto extends PartialType(CreatePneuDto) {}
