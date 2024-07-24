import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ufamexplore@gmail.com',
        pass: 'kapc mmey kzvv dxxw',
      },
    });
  }

  async sendResetPasswordEmail(to: string, token: string) {
    this.logger.log(`Iniciando envio de email para ${to}`);
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #002b7f;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #002b7f;
            border-radius: 10px;
          }
          .email-header {
            text-align: center;
            margin-bottom: 20px;
          }
          .email-body {
            text-align: center;
            color: #ffffff;
          }
          .email-body h2 {
            color: #002b7f;
          }
          .email-body p {
            color: #ffffff;
            margin: 10px 0;
          }
          .email-body .token {
            font-size: 24px;
            color: #002b7f;
          }
          .email-body .header {
            color: #002b7f;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>Ufam Explore</h1>
          </div>
          <div class="email-body">
            <h2 class="header">Redefinição de Senha</h2>
            <p>Olá,</p>
            <p>Você solicitou a redefinição de sua senha. Aqui está o seu token de redefinição de senha:</p>
            <p class="token">${token}</p>
            <p>Insira este token no aplicativo para redefinir sua senha.</p>
            <p>Se você não solicitou esta redefinição, por favor ignore este email.</p>
            <p>Atenciosamente,<br>Equipe Ufam Explore</p>
          </div>
        </div>
      </body>
      </html>
    `;

    this.logger.log(`Conteúdo do email preparado para ${to}`);

    try {
      await this.transporter.sendMail({
        from: `"Ufam Explore" <ufamexplore@gmail.com>`,
        to,
        subject: 'Reset de senha - Ufam Explore',
        html: htmlContent,
      });
      this.logger.log(`Email enviado com sucesso para ${to}`);
    } catch (error) {
      this.logger.error(`Falha ao enviar email para ${to}: ${error.message}`);
    }
  }
}
