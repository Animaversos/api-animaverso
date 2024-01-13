import { PartialType } from '@nestjs/mapped-types';
import { CreateInteressadoDto } from './create-interessado.dto';

export class UpdateInteressadoDto extends PartialType(CreateInteressadoDto) {}
