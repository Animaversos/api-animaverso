import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  nome: string;

  @IsString({ message: 'Email deve ser uma string' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @Length(6, 20, { message: 'Senha deve ter entre 6 e 20 caracteres' })
  senha: string;

  @IsNotEmpty({ message: 'Usuário é obrigatório' })
  @Length(3, 20, { message: 'Usuário deve ter entre 3 e 20 caracteres' })
  usuario: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @Length(11, 11, { message: 'CPF deve ter 11 dígitos' })
  cpf: string;
}
