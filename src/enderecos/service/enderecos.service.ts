import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import axios from 'axios';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';

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

  async createEstadosCidades() {
    const { data } = await axios.get(
      `http://servicodados.ibge.gov.br/api/v1/localidades/estados/`,
    );

    const estados: Estados[] = data.map((estado) => {
      return {
        id_ibge: estado.id,
        nome: estado.nome,
        uf: estado.sigla,
      };
    });

    await this.repository.estados.createMany({
      data: estados,
    });

    estados.forEach((estados) => {
      this.createCidades(estados.id_ibge);
    });

    return { message: 'Estados e cidades importados' };
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

  async createEnderecoUsuario(body: CreateEnderecoDto) {
    const usuario = await this.repository.usuario.findUnique({
      where: {
        id: body.id_usuario,
      },
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado', 404);
    }

    return this.repository.endereco.create({
      data: {
        usuario: {
          connect: {
            id: body.id_usuario,
          },
        },
        logradouro: body.logradouro,
        numero: body.numero,
        complemento: body.complemento,
        bairro: body.bairro,
        cidades: {
          connect: {
            id: +body.id_cidade,
          },
        },
        estado: {
          connect: {
            id: +body.id_estado,
          },
        },
      },
    });
  }
}
