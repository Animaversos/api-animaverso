import { IsNotEmpty, IsString, Length, ValidateIf } from 'class-validator';

export class CreateEnderecoDto {
  @IsNotEmpty({ message: 'O id do usuário é obrigatório' })
  id_usuario: number;
  @IsNotEmpty({ message: 'O logradouro é obrigatório' })
  logradouro: string;

  @IsString({ message: 'O tipo de dado do número está incorreto' })
  @IsNotEmpty({ message: 'O número é obrigatório' })
  numero: string;

  @Length(0, 255, {
    message: 'O complemento deve ter no máximo 255 caracteres',
  })
  @ValidateIf((_, value) => value !== null)
  complemento?: string;
  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  bairro: string;
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  id_cidade: any;
  @IsNotEmpty({ message: 'O estado é obrigatório' })
  id_estado: any;
}
