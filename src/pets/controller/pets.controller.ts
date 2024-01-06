import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
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
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async uploadImagesPets(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: any,
  ) {
    try {
      const petInfo = JSON.parse(request.body.petInfo) as CreatePetDto;
      const petCadastrado = await this.petsService.create(petInfo);
      await this.petsService.uploadImagesPets(petCadastrado.id, file);

      return {
        mensagem: 'Pet cadastrado com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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

  @Get('usuario/:id_usuario/:id_pet')
  findOne(@Param('id_usuario') id: string, @Param('id_pet') id_pet: string) {
    return this.petsService.findOne(+id, +id_pet);
  }
}
