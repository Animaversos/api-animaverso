import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateEmailUsuarioDto } from './dto/update-usuario.dto';

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

  async findNomeEmail(id: number) {
    return await this.repository.usuario.findUnique({
      where: { id: id },
      select: { nome: true, email: true },
    });
  }

  async updateEmail(id: number, updateEmailUsuarioDto: UpdateEmailUsuarioDto) {
    const userAtualizado = await this.repository.usuario.update({
      where: { id: id },
      data: updateEmailUsuarioDto,
    });
    return { email: userAtualizado.email };
  }
}
