import { Especie, Genero, Porte } from '../enums';

export type Filtros = {
  cidade?: number;
  genero?: Genero;
  porte?: Porte;
  especie?: Especie;
};
