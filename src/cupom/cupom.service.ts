import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SimNao } from '@prisma/client';

@Injectable()
export class CupomService {
  constructor(private repository: PrismaService) {}

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

  findOne(id: number) {
    return `This action returns a #${id} cupom`;
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
