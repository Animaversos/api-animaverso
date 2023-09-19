import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { Public } from './custom-decorator';

type User = {
  usuario: string;
  senha: string;
};

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private repository: PrismaService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() usuario: User): Promise<any> {
    try {
      const user = await this.repository.usuario.findUnique({
        where: { usuario: usuario.usuario },
      });

      if (!user) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isSenha = await bcrypt.compare(usuario.senha, user.senha);

      if (!isSenha) {
        throw new HttpException('Senha inválida', HttpStatus.BAD_REQUEST);
      }

      const payload = { sub: user.id, username: user.usuario };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao realizar login',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
