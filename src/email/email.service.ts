import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { RedefinirSenhaTemplate } from './templates/redefinir-senha.template';
import { PetAdotadoTemplate } from './templates/pet-adotado.template';

const resend = new Resend(process.env.RESEND_API_KEY);

@Injectable()
export class EmailService {
  async sendEmailRedefinirSenha(link: string, email: string) {
    await resend.emails.send({
      from: 'contato@animaverso.com.br',
      to: [email],
      subject: 'Redefinição de Senha - Animaverso',
      html: RedefinirSenhaTemplate(link),
    });
  }

  async sendEmailPetDoado(email: string, nomePet: string, cupom: string) {
    await resend.emails.send({
      from: 'contato@animaverso.com.br',
      to: [email],
      subject: `Parabéns, você adotou o ${nomePet} - O Animaverso agradece e o parabeniza!`,
      html: PetAdotadoTemplate(nomePet, cupom),
    });
  }
}
