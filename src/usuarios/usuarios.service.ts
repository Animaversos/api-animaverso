import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private repository: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    createUsuarioDto.senha = await bcrypt.hash(createUsuarioDto.senha, 10);
    return await this.repository.usuario.create({
      data: createUsuarioDto,
    });
  }

  async findOne(id: number) {
    return await this.repository.usuario.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.repository.usuario.update({
      where: { id: id },
      data: updateUsuarioDto,
    });
    return { message: 'Usuário atualizado com sucesso!' };
  }
}
