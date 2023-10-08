import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EnderecosService } from '../service/enderecos.service';

type Estados = {
  id_ibge: number;
  nome: string;
  uf: string;
};

type Cidades = {
  id_ibge: number;
  nome: string;
  id_ibge_estado: number;
};

@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Post('estados')
  createEstados(@Body() createEstados: Estados[]) {
    return this.enderecosService.createEstados(createEstados);
  }

  @Post('cidades/:id_ibge_estado')
  async createCidades(@Param('id_ibge_estado') id_ibge_estado: number) {
    return this.enderecosService.createCidades(id_ibge_estado);
  }

  @Get('estados')
  findAllEstados() {
    return this.enderecosService.findAllEstados();
  }

  @Get('cidades/:uf')
  findAllCidades(@Param('uf') uf: string, @Query('nome') nome: string) {
    return this.enderecosService.findAllCidades(uf, nome);
  }
}
