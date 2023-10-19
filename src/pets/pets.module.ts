import { Module } from '@nestjs/common';
import { PetsService } from './service/pets.service';
import { PetsController } from './controller/pets.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseModule } from '../storage/supabase/supabase.module';

@Module({
  controllers: [PetsController],
  providers: [PetsService, PrismaService],
  imports: [SupabaseModule],
})
export class PetsModule {}
