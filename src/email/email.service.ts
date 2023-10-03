import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { RedefinirSenhaTemplate } from './templates/redefinir-senha.template';

const resend = new Resend(process.env.RESEND_API_KEY);

@Injectable()
export class EmailService {
  constructor() {}

  async sendEmailRedefinirSenha(link: string, email: string) {
    await resend.emails.send({
      from: 'contato@animaverso.com.br',
      to: [email],
      subject: 'Redefinição de Senha - Animaverso',
      html: RedefinirSenhaTemplate(link),
    });
  }
}
