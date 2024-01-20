import { Module } from '@nestjs/common';
import { CupomService } from './cupom.service';
import { CupomController } from './controller/cupom.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseModule } from '../storage/supabase/supabase.module';

@Module({
  controllers: [CupomController],
  providers: [CupomService, PrismaService],
  imports: [SupabaseModule],
})
export class CupomModule {}
