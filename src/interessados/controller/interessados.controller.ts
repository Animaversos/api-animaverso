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
  findAll(@Param('id_usuario_dono_pet') idUsuarioDonoPet: number) {
    return this.interessadosService.findAllPetsByIdDono(+idUsuarioDonoPet);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interessadosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInteressadoDto: UpdateInteressadoDto,
  ) {
    return this.interessadosService.update(+id, updateInteressadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interessadosService.remove(+id);
  }
}
