import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SimNao } from '@prisma/client';
import { Supabase } from 'src/storage/supabase/supabase';

@Injectable()
export class CupomService {
  constructor(
    private repository: PrismaService,
    private readonly supabase: Supabase,
  ) {}

  async create(petId: number) {
    const pet = await this.repository.pets.findUnique({
      where: {
        id: petId,
      },
    });

    if (!pet) {
      throw new HttpException('Pet não encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.repository.cupom.create({
      data: {
        petId: petId,
        usado: SimNao.NAO,
        codigo: (pet.nome + pet.id + this.obterDataFormatada())
          .toUpperCase()
          .replace(/\s/g, '')
          .trim(),
      },
    });
  }

  async confirmaCupom(cupom: string) {
    const data = await this.repository.cupom.findUnique({
      where: {
        codigo: cupom.toUpperCase().replace(/\s/g, '').trim(),
      },
    });

    if (!data) {
      throw new HttpException('Cupom não encontrado', HttpStatus.NOT_FOUND);
    }

    if (data.usado === SimNao.SIM) {
      throw new HttpException('Cupom já utilizado', HttpStatus.BAD_REQUEST);
    }

    await this.repository.cupom.update({
      where: {
        id: data.id,
      },
      data: {
        usado: SimNao.SIM,
      },
    });

    return {
      message: 'Cupom confirmado',
    };
  }

  async findByCupom(cupom: string) {
    const data = await this.repository.cupom.findUnique({
      where: {
        codigo: cupom.toUpperCase().replace(/\s/g, '').trim(),
      },
      include: {
        pet: {
          select: {
            nome: true,
            file_original_name: true,
            interessados: {
              select: {
                usuario: {
                  select: {
                    nome: true,
                    email: true,
                    cpf: true,
                  },
                },
              },
              where: {
                adotou: SimNao.SIM,
              },
            },
          },
        },
      },
    });

    if (!data) {
      throw new HttpException('Cupom não encontrado', HttpStatus.NOT_FOUND);
    }

    if (data.usado === SimNao.SIM) {
      throw new HttpException('Cupom já utilizado', HttpStatus.BAD_REQUEST);
    }

    return {
      ...data,
      image: this.supabase
        .getClient()
        .storage.from('pets')
        .getPublicUrl(`${data.pet.file_original_name}`),
    };
  }

  obterDataFormatada() {
    const dataAtual = new Date();

    // Obtendo os componentes da data
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // O mês é baseado em zero, então é necessário adicionar 1
    const ano = String(dataAtual.getFullYear());

    // Concatenando os componentes no formato desejado
    const dataFormatada = dia + mes + ano;

    return dataFormatada;
  }
}
