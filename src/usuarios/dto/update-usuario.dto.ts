import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString({ message: 'Email deve ser uma string' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g, { message: 'Email inválido' })
  email: string;
}
