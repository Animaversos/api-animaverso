import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsuariosController } from './controller/usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService],
})
export class UsuariosModule {}
