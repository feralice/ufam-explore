import { Injectable, Logger } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private notificationsRepository: NotificationsRepository) {}

  async getNotificationsByUser(usuarioId: string) {
    this.logger.log(`Fetching notifications for user: ${usuarioId}`);

    const [upvotes, downvotes, comentarios, salvos] = await Promise.all([
      this.notificationsRepository.findUpvotesByUser(usuarioId),
      this.notificationsRepository.findDownvotesByUser(usuarioId),
      this.notificationsRepository.findCommentsByUser(usuarioId),
      this.notificationsRepository.findSavedPostsByUser(usuarioId),
    ]);

    this.logger.log(`Upvotes: ${JSON.stringify(upvotes)}`);
    this.logger.log(`Downvotes: ${JSON.stringify(downvotes)}`);
    this.logger.log(`Comentarios: ${JSON.stringify(comentarios)}`);
    this.logger.log(`Salvos: ${JSON.stringify(salvos)}`);

    const formatNotification = (notification, type) => {
      let message = '';
      switch (type) {
        case 'upvote':
          message = `@${notification.usuario.username} deu upvote na sua publicação`;
          break;
        case 'downvote':
          message = `@${notification.usuario.username} deu downvote na sua publicação`;
          break;
        case 'comentario':
          message = `@${notification.usuario.username} comentou: "${notification.conteudo}" na sua publicação`;
          break;
        case 'salvar':
          message = `@${notification.usuario.username} salvou a sua publicação`;
          break;
      }
      return {
        message,
        postagemId: notification.postagemId,
      };
    };

    const notifications = [
      ...upvotes.map((notification) =>
        formatNotification(notification, 'upvote'),
      ),
      ...downvotes.map((notification) =>
        formatNotification(notification, 'downvote'),
      ),
      ...comentarios.map((notification) =>
        formatNotification(notification, 'comentario'),
      ),
      ...salvos.map((notification) =>
        formatNotification(notification, 'salvar'),
      ),
    ];

    this.logger.log(
      `Formatted Notifications: ${JSON.stringify(notifications)}`,
    );

    return notifications;
  }
}
