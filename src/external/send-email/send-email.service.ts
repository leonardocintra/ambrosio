import { Injectable, Logger } from '@nestjs/common';
import { ResendService } from 'nestjs-resend';

@Injectable()
export class SendEmailService {
  private readonly logger = new Logger(SendEmailService.name);

  constructor(private readonly resendService: ResendService) {}

  // ATENCAO: precisa implementar em producao quando tiver o dominio verificado

  async sendRecoveryEmail(
    to: string,
    resetLink: string,
    tempPassword?: string,
  ) {
    this.logger.log(`Enviando email de recuperação para ${to}`);

    try {
      await this.resendService.send({
        from: 'delivered+user2@resend.dev',
        to,
        subject: 'CNC - Gestão - Recuperação de senha',
        html: `<p>Voce precisa acessar com sua senha temporária (${tempPassword}) e mudar a senha.</p>`,
      });
      // Clique aqui para redefinir a senha: <a href="${resetLink}">${resetLink}</a>
      this.logger.log(`Email de recuperação enviado para ${to}. Senha temporária: ${tempPassword}`);
    } catch (error) {
      this.logger.error(
        `Erro ao enviar email de recuperação para ${to}: ${error.message}`,
      );
      throw error;
    }
  }
}
