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

enum Especie {
  CACHORRO = 'CACHORRO',
  GATO = 'GATO',
  OUTROS = 'OUTROS',
}

enum Idade {
  ZERO_A_SEIS_MESES = 'ZERO_A_SEIS_MESES',
  SEIS_MESES_A_UM_ANO = 'SEIS_MESES_A_UM_ANO',
  UM_A_DOIS_ANOS = 'UM_A_DOIS_ANOS',
  DOIS_A_CINCO_ANOS = 'DOIS_A_CINCO_ANOS',
}

enum Porte {
  PEQUENO = 'PEQUENO',
  MEDIO = 'MEDIO',
  GRANDE = 'GRANDE',
}

enum Genero {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
}
