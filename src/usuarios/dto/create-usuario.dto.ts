import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  usuario: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  cpf: string;
}
