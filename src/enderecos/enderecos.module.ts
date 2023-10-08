import { Module } from '@nestjs/common';
import { EnderecosService } from './service/enderecos.service';
import { EnderecosController } from './controller/enderecos.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EnderecosController],
  providers: [EnderecosService, PrismaService],
})
export class EnderecosModule {}
