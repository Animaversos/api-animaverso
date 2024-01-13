import { IsNotEmpty } from 'class-validator';

export class CreateInteressadoDto {
  @IsNotEmpty({ message: 'O código do pet deve ser informado' })
  id_pet: number;
  @IsNotEmpty({ message: 'O código do usúario deve ser informado' })
  id_usuario: number;
}
