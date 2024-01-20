import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInteressadoDto } from './dto/create-interessado.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InteressadosService {
  constructor(private repository: PrismaService) {}

  async create(createInteressadoDto: CreateInteressadoDto) {
    const existsPet = await this.repository.pets.count({
      where: {
        id: createInteressadoDto.id_pet,
      },
    });

    if (!existsPet) {
      throw new HttpException('Pet não encontrado', HttpStatus.NOT_FOUND);
    }

    const existsUsuario = await this.repository.usuario.count({
      where: {
        id: createInteressadoDto.id_usuario,
      },
    });

    if (!existsUsuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const existsInteresse = await this.repository.interessados.count({
      where: {
        id_pet: createInteressadoDto.id_pet,
        id_usuario: createInteressadoDto.id_usuario,
      },
    });

    if (existsInteresse) {
      throw new HttpException(
        'Interesse já registrado',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.repository.interessados.create({
      data: {
        id_pet: createInteressadoDto.id_pet,
        id_usuario: createInteressadoDto.id_usuario,
      },
    });
  }

  async findAllPetsByIdDono(idDono: number) {
    return await this.repository.interessados.findMany({
      where: {
        pet: {
          usuarioId: idDono,
        },
      },
      include: {
        pet: {
          select: {
            nome: true,
            adotado: true,
            usuario: {
              select: {
                endereco: {
                  select: {
                    cidades: {
                      select: {
                        nome: true,
                      },
                    },
                    estado: {
                      select: {
                        uf: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        usuario: {
          select: {
            nome: true,
          },
        },
      },
    });
  }

  async findAllInteressesByIdUsuario(idUsuario: number) {
    return await this.repository.interessados.findMany({
      where: {
        id_usuario: idUsuario,
      },
      include: {
        pet: {
          select: {
            nome: true,
            adotado: true,
            especie: true,
            usuario: {
              select: {
                endereco: {
                  select: {
                    cidades: {
                      select: {
                        nome: true,
                      },
                    },
                    estado: {
                      select: {
                        uf: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async remove(id: number) {
    return await this.repository.interessados.delete({
      where: {
        id: id,
      },
    });
  }
}
