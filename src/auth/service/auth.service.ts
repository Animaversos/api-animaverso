import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { LoginReturnDto, UserDto } from '../dto/login-return.dto';
import { LoginDto } from '../dto/login.dto';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { EmailService } from '../../email/email.service';
import {
  AtualizarSenhaEsquecidaDto,
  RecuperarSenhaData,
  ReturnMessage,
  VerifyPasswordData,
} from '../types';

const { randomBytes } = require('crypto');

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
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
      const authEntity = await this.repository.authTable.findUnique({
        where: { usuarioId: user.id },
      });
      if (!authEntity) {
        await this.repository.authTable.create({
          data: {
            refreshToken: refresToken,
            usuario: { connect: { id: user.id } },
          },
        });
      } else {
        await this.repository.authTable.update({
          where: { id: authEntity.id },
          data: { refreshToken: refresToken },
        });
      }

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

  async registrar(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      createUsuarioDto.senha = await bcrypt.hash(createUsuarioDto.senha, 10);
      return this.repository.usuario.create({
        data: createUsuarioDto,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
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
    return this.repository.usuario.findUnique({
      where: { usuario: usuario },
    });
  }

  private async verifyPassword(data: VerifyPasswordData): Promise<void> {
    const isSenha = await bcrypt.compare(data.senha_login, data.senha_usuario);

    if (!isSenha) {
      throw new HttpException('Senha inválida', HttpStatus.BAD_REQUEST);
    }
  }

  async recuperarSenha(data: RecuperarSenhaData): Promise<ReturnMessage> {
    const usuario = await this.repository.usuario.findFirst({
      where: { email: data.email },
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);
    }
    const tokenRecuperarSenha = randomBytes(32).toString('hex');

    const authTableUser = await this.repository.authTable.findUnique({
      where: { usuarioId: usuario.id },
    });

    if (!authTableUser) {
      await this.repository.authTable.create({
        data: {
          usuarioId: usuario.id,
          recuperaSenhaToken: tokenRecuperarSenha,
        },
      });
    } else {
      await this.repository.authTable.update({
        where: { id: authTableUser.id },
        data: {
          recuperaSenhaToken: tokenRecuperarSenha,
        },
      });
    }
    console.log(tokenRecuperarSenha);
    // await this.emailService.sendEmail(); TODO - DEVE ENVIAR O EMAIL COM O TOKEN PARA O USUARIO

    return {
      message: 'Foi enviado um email com instruções para resetar sua senha',
    };
  }

  async atualizarSenhaEsquecida(
    dto: AtualizarSenhaEsquecidaDto,
    token: string,
  ): Promise<ReturnMessage> {
    if (!token) {
      throw new HttpException('Token não encontrado', HttpStatus.BAD_REQUEST);
    }
    const hasAuthTable = await this.repository.authTable.findFirst({
      select: {
        usuarioId: true,
        recuperaSenhaToken: true,
      },
      where: {
        recuperaSenhaToken: {
          startsWith: token.toString(),
        },
      },
    });

    if (!hasAuthTable) {
      throw new HttpException('Token inexistente!', HttpStatus.BAD_REQUEST);
    }

    if (hasAuthTable.recuperaSenhaToken !== token) {
      throw new HttpException('Token inválido!', HttpStatus.BAD_REQUEST);
    }

    const usuario = await this.repository.usuario.findUnique({
      where: { id: hasAuthTable.usuarioId },
    });

    const isSenhaIgual = await bcrypt.compare(dto.senha, usuario.senha);

    if (isSenhaIgual) {
      throw new HttpException('Senha igual a anterior', HttpStatus.BAD_REQUEST);
    }

    const senhaHash = await bcrypt.hash(dto.senha, 10);

    await this.repository.usuario.update({
      where: { id: usuario.id },
      data: { senha: senhaHash },
    });

    await this.repository.authTable.update({
      where: { usuarioId: usuario.id },
      data: { recuperaSenhaToken: null },
    });

    return {
      message: 'Senha atualizada com sucesso',
    };
  }
}
