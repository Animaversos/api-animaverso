import { Especie, Genero, Idade, Porte } from '../enums';

export class CreatePetDto {
  nome: string;
  especie: Especie;
  idade: Idade;
  peso: number;
  porte: Porte;
  genero: Genero;
  observacao?: string;
  usuarioId: number;
}
