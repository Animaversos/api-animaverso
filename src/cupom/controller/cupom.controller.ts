import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { CupomService } from '../cupom.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('cupom')
export class CupomController {
  constructor(private readonly cupomService: CupomService) {}

  @Get(':cupom')
  @Public()
  findOne(@Param('cupom') cupom: string) {
    return this.cupomService.findByCupom(cupom);
  }

  @Post(':cupom')
  @Public()
  @HttpCode(200)
  confirmarCupom(@Param('cupom') cupom: string) {
    return this.cupomService.confirmaCupom(cupom);
  }

  @Post()
  create(@Body() body: any) {
    return this.cupomService.create(+body.idPet);
  }
}
