import { Module } from '@nestjs/common';
import { PetsService } from './service/pets.service';
import { PetsController } from './controller/pets.controller';

@Module({
  controllers: [PetsController],
  providers: [PetsService]
})
export class PetsModule {}
