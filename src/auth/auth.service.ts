import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginReturnDto, UserDto } from './dto/login-return.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(usuario: LoginDto): Promise<LoginReturnDto> {
    try {
      const user = await this.returnUsuario(usuario.usuario);

      if (!user) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.verifyPassword({
        senha_login: usuario.senha,
        senha_usuario: user.senha,
      });

      const payloadAccess = {
        sub: user.id,
        username: user.usuario,
      };

      const access_token = this.jwtService.sign(payloadAccess);
      const refresToken = this.generateRefreshToken(
        payloadAccess.sub.toString(),
      );

      //TODO - Salva refresh token no banco de dados

      const userDto: UserDto = {
        id: user.id,
        usuario: user.usuario,
        email: user.email,
      };

      return {
        access_token,
        refresh_token: refresToken,
        usuario: userDto,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao realizar login',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private generateRefreshToken(userId: string) {
    const payload = { userId: userId, time: new Date().getMilliseconds() };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_SECRET_KEY'),
      expiresIn: `${this.configService.get('REFRESH_SECRET_KEY_EXPIRATION')}s`,
    });
  }

  private async returnUsuario(usuario: string): Promise<any> {
    return await this.repository.usuario.findUnique({
      where: { usuario: usuario },
    });
  }

  private async verifyPassword(data: VerifyPasswordData): Promise<void> {
    const isSenha = await bcrypt.compare(data.senha_login, data.senha_usuario);

    if (!isSenha) {
      throw new HttpException('Senha inválida', HttpStatus.BAD_REQUEST);
    }
  }
}

type VerifyPasswordData = {
  senha_login: string;
  senha_usuario: string;
};
