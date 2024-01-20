import { Module } from '@nestjs/common';
import { InteressadosService } from './interessados.service';
import { InteressadosController } from './controller/interessados.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [InteressadosController],
  providers: [InteressadosService, PrismaService],
})
export class InteressadosModule {}
