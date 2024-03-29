import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../../usuarios/dto/create-usuario.dto';
import { Public } from '../../decorators/public.decorator';
import { LoginReturnDto } from '../dto/login-return.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { EmailService } from '../../email/email.service';
import {
  AtualizarSenhaEsquecidaDto,
  RecuperarSenhaData,
  ReturnMessage,
} from '../types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login/')
  async realizarLogin(@Body() loginDto: LoginDto): Promise<LoginReturnDto> {
    return await this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('registrar')
  async registrarUsuario(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<RegistrarReturnDto> {
    const usuario = await this.authService.registrar(createUsuarioDto);

    return {
      id: usuario.id,
      usuario: usuario.usuario,
      email: usuario.email,
      cpf: usuario.cpf,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('recuperar-senha')
  async recuperarSenha(
    @Body() email: RecuperarSenhaData,
  ): Promise<ReturnMessage> {
    return await this.authService.recuperarSenha(email);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/atualiza-senha-esquecida/:token')
  async atualizarSenhaEsquecida(
    @Param('token') token: string,
    @Body() dto: AtualizarSenhaEsquecidaDto,
  ): Promise<ReturnMessage> {
    return await this.authService.atualizarSenhaEsquecida(dto, token);
  }
  @HttpCode(HttpStatus.OK)
  @Public()
  @Get('/verifica-token/:token')
  async verificaRefreshToken(@Param('token') token: string) {
    return await this.authService.verificaRefreshToken(token);
  }
}
