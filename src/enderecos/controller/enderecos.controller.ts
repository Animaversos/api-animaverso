import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EnderecosService } from '../service/enderecos.service';
import { Estados } from '../types';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { Public } from '../../decorators/public.decorator';

@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Post('usuario')
  async createEnderecoUsuario(@Body() body: CreateEnderecoDto) {
    return await this.enderecosService.createEnderecoUsuario(body);
  }

  @Public()
  @Post('estados-cidades')
  createEstados() {
    return this.enderecosService.createEstadosCidades();
  }

  @Public()
  @Post('cidades/:id_ibge_estado')
  async createCidades(@Param('id_ibge_estado') id_ibge_estado: number) {
    return this.enderecosService.createCidades(id_ibge_estado);
  }

  @Get('estados')
  findAllEstados(@Query('nome') nome: string) {
    return this.enderecosService.findAllEstados(nome);
  }

  @Get('cidades/:uf')
  findAllCidades(@Param('uf') uf: string, @Query('nome') nome: string) {
    return this.enderecosService.findAllCidades(uf, nome);
  }
}
