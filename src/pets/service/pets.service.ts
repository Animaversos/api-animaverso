import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from '../dto/create-pet.dto';
import { UpdatePetDto } from '../dto/update-pet.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Supabase } from '../../storage/supabase/supabase';

@Injectable()
export class PetsService {
  constructor(
    private readonly repository: PrismaService,
    private readonly supabase: Supabase,
  ) {}

  create(createPetDto: CreatePetDto) {
    return this.repository.pets.create({
      data: {
        nome: createPetDto.nome,
        especie: createPetDto.especie,
        genero: createPetDto.genero,
        porte: createPetDto.porte,
        idade: createPetDto.idade,
        peso: createPetDto.peso,
        observacao: createPetDto.observacao,
        usuario: {
          connect: {
            id: createPetDto.usuarioId,
          },
        },
      },
    });
  }

  async uploadImagesPets(id_pet: number, file: Express.Multer.File) {
    if (!file)
      throw new HttpException(
        'Arquivo não encontrado para realizar o upload',
        HttpStatus.NOT_FOUND,
      );

    const pet = await this.repository.pets.findUnique({
      where: {
        id: id_pet,
      },
    });

    if (!pet)
      throw new HttpException('Pet não encontrado', HttpStatus.NOT_FOUND);

    return await this.supabase
      .getClient()
      .storage.from('pets')
      .upload(`${id_pet}/${file.originalname}`, file.buffer, {
        upsert: true,
      });
  }

  findAll() {
    return `This action returns all pets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
