import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PetsService } from '../service/pets.service';
import { CreatePetDto } from '../dto/create-pet.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../../decorators/public.decorator';
import { Filtros } from '../types/filter-pets.types';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Public()
  @Post('upload/:id_pet')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImagesPets(
    @Param('id_pet') id_pet: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.petsService.uploadImagesPets(+id_pet, file);
  }

  @Get()
  @Public()
  findAll(@Query() filters: Filtros) {
    return this.petsService.findAll(filters);
  }

  @Get('/usuario/:id_usuario')
  findAllPetsByUser(@Param('id_usuario') id_usuario: number) {
    return this.petsService.findAllPetsByUser(+id_usuario);
  }
}
