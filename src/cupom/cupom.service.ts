import { Injectable } from '@nestjs/common';
import { UpdateCupomDto } from './dto/update-cupom.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SimNao } from '@prisma/client';

@Injectable()
export class CupomService {
  constructor(private repository: PrismaService) {}

  async create(petId: number) {
    return await this.repository.cupom.create({
      data: {
        petId: petId,
        usado: SimNao.NAO,
        codigo:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15).toString(),
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} cupom`;
  }
}
