import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Supabase } from '../../storage/supabase/supabase';
import { CreatePetDto } from '../dto/create-pet.dto';
import { Filtros } from '../types/filter-pets.types';

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

    const imageUpload = await this.supabase
      .getClient()
      .storage.from('pets')
      .upload(`${id_pet}/${file.originalname}`, file.buffer, {
        upsert: true,
      });

    await this.repository.pets.update({
      where: {
        id: id_pet,
      },
      data: {
        file_original_name: imageUpload.data.path,
      },
    });

    return imageUpload;
  }

  async findAll(filters: Filtros) {
    const pets = await this.repository.pets.findMany({
      take: 1,
      where: {
        AND: [
          filters.cidade
            ? {
                usuario: {
                  endereco: {
                    cidades: {
                      id: +filters.cidade,
                    },
                  },
                },
              }
            : {},
          filters.genero ? { genero: filters.genero } : {},
          filters.porte ? { porte: filters.porte } : {},
          filters.especie ? { especie: filters.especie } : {},
        ],
      },
      include: {
        usuario: {
          select: {
            nome: true,
            endereco: {
              select: {
                bairro: true,
                numero: true,
                complemento: true,
                logradouro: true,
                estado: {
                  select: {
                    nome: true,
                  },
                },
                cidades: {
                  select: {
                    nome: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return pets.map((pet) => {
      return {
        ...pet,
        url_image: this.supabase
          .getClient()
          .storage.from('pets')
          .getPublicUrl(`${pet.file_original_name}`),
      };
    });
  }

  async findAllPetsByUser(id_usuario: number) {
    return await this.repository.pets.findMany({
      where: {
        usuarioId: id_usuario,
      },
    });
  }
}
