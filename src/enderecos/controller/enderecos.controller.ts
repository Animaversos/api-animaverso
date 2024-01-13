import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EnderecosService } from '../service/enderecos.service';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { Public } from '../../decorators/public.decorator';

@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Post('usuario')
  async createEnderecoUsuario(@Body() body: CreateEnderecoDto) {
    return await this.enderecosService.createEnderecoUsuario(body);
  }

  @Patch('usuario')
  async updateEnderecoUsuario(@Body() body: any) {
    return await this.enderecosService.updateEnderecoUsuario(body);
  }
  @Get('usuario/:id')
  async findByUsuarioId(@Param('id') id: number) {
    return await this.enderecosService.findByUsuarioId(id);
  }

  @Public()
  @Post('estados-cidades')
  createEstados() {
    return this.enderecosService.createEstadosCidades();
  }

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

  @Get('cidades')
  async findAllCidadesByNome(@Query() filter: any) {
    return await this.enderecosService.findAllCidadesByNome(filter);
  }
}
