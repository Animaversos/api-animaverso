import { Module } from '@nestjs/common';
import { PetsService } from './service/pets.service';
import { PetsController } from './controller/pets.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseModule } from '../storage/supabase/supabase.module';
import { EmailService } from '../email/email.service';
import { CupomService } from '../cupom/cupom.service';

@Module({
  controllers: [PetsController],
  providers: [PetsService, PrismaService, EmailService, CupomService],
  imports: [SupabaseModule],
})
export class PetsModule {}
