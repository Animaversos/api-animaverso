import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateEmailUsuarioDto } from '../dto/update-usuario.dto';
import { UsuariosService } from '../usuarios.service';

@Public()
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuariosService.create(createUsuarioDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Get(':id/nome-email')
  findNomeEmail(@Param('id') id: string) {
    return this.usuariosService.findNomeEmail(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmailUsuarioDto: UpdateEmailUsuarioDto,
  ) {
    return this.usuariosService.updateEmail(+id, updateEmailUsuarioDto);
  }
}
