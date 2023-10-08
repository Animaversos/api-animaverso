import { Injectable } from '@nestjs/common';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';
import { PrismaService } from '../../prisma/prisma.service';
import axios from 'axios';

type Estados = {
  id_ibge: number;
  nome: string;
  uf: string;
};
type Cidades = {
  id_ibge: number;
  nome: string;
  id_ibge_estado: number;
};

@Injectable()
export class EnderecosService {
  constructor(private readonly repository: PrismaService) {}

  async createEstados(createEstados: Estados[]) {
    return this.repository.estados.createMany({
      data: createEstados,
    });
  }

  async createCidades(id_ibge_estado: number) {
    const { data } = await axios.get(
      `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${id_ibge_estado}/municipios`,
    );
    const cidades: Cidades[] = data.map((cidade: { id: any; nome: any }) => {
      return {
        id_ibge: cidade.id,
        nome: cidade.nome,
        id_ibge_estado: +id_ibge_estado,
      };
    });
    return this.repository.cidades.createMany({
      data: cidades,
    });
  }

  async findAll() {
    return `This action returns all enderecos`;
  }

  findAllEstados() {
    return this.repository.estados.findMany();
  }

  findAllCidades(uf: string, nome: string) {
    return this.repository.cidades.findMany({
      where: {
        estado: {
          uf: uf,
        },
        nome: {
          mode: 'insensitive',
          contains: nome,
        },
      },
    });
  }

  update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    return `This action updates a #${id} endereco`;
  }

  remove(id: number) {
    return `This action removes a #${id} endereco`;
  }
}
