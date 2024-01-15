import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CupomService } from '../cupom.service';

@Controller('cupom')
export class CupomController {
  constructor(private readonly cupomService: CupomService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cupomService.findOne(+id);
  }

  @Post()
  create(@Body() body: any) {
    return this.cupomService.create(+body.idPet);
  }
}
