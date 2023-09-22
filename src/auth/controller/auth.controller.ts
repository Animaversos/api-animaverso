import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { Public } from '../../decorators/public.decorator';
import { LoginReturnDto } from '../dto/login-return.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async realizarLogin(@Body() loginDto: LoginDto): Promise<LoginReturnDto> {
    return await this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('registrar')
  async registrarUsuario(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<RegistrarReturnDto> {
    let usuario = await this.authService.registrar(createUsuarioDto);

    return {
      id: usuario.id,
      usuario: usuario.usuario,
      email: usuario.email,
      cpf: usuario.cpf,
    };
  }
}
