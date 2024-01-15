import { Module } from '@nestjs/common';
import { CupomService } from './cupom.service';
import { CupomController } from './controller/cupom.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CupomController],
  providers: [CupomService, PrismaService],
})
export class CupomModule {}
