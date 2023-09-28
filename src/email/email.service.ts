import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

@Injectable()
export class EmailService {
  constructor() {}

  async sendEmail() {
    await resend.emails.send({
      from: 'contato@animaverso.com.br',
      to: ['ismael.eliass22@gmail.com'],
      subject: 'Email de teste do Animaverso',
      html: '<strong>Funcionou!</strong>',
    });
  }
}
