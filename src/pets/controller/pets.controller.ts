import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
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
  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async updatePet(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: any,
  ) {
    try {
      const petInfo = JSON.parse(request.body.petInfo) as CreatePetDto;
      const petCadastrado = await this.petsService.update(+id, petInfo);
      if (file) {
        await this.petsService.removeImage(+id);
        await this.petsService.uploadImagesPets(petCadastrado.id, file);
      }

      return {
        mensagem: 'Pet atualizado com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @Public()
  findAll(@Query() filters: any) {
    if (filters.especie) {
      filters.especie = filters.especie.split(',');
    }
    if (filters.porte) {
      filters.porte = filters.porte.split(',');
    }
    if (filters.genero) {
      filters.genero = filters.genero.split(',');
    }
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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.petsService.remove(+id);
  }

  @Patch('adotou/:id')
  async adotou(@Param('id') id: string) {
    return await this.petsService.adotou(+id);
  }
}
