import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InteressadosService } from '../interessados.service';
import { CreateInteressadoDto } from '../dto/create-interessado.dto';
import { UpdateInteressadoDto } from '../dto/update-interessado.dto';

@Controller('interessados')
export class InteressadosController {
  constructor(private readonly interessadosService: InteressadosService) {}

  @Post()
  create(@Body() createInteressadoDto: CreateInteressadoDto) {
    return this.interessadosService.create(createInteressadoDto);
  }

  @Get('/pets/:id_usuario_dono_pet')
  findAllPetsByIdDono(@Param('id_usuario_dono_pet') idUsuarioDonoPet: number) {
    return this.interessadosService.findAllPetsByIdDono(+idUsuarioDonoPet);
  }

  @Get('/usuario/:idUsuario')
  findAllInteressesByIdUsuario(@Param('idUsuario') idUsuario: number) {
    return this.interessadosService.findAllInteressesByIdUsuario(+idUsuario);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.interessadosService.remove(+id);
  }
}
