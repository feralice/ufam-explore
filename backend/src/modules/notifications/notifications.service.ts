import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
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

    const formatNotification = (notification, type) => {
      let message = '';
      switch (type) {
        case 'upvote':
          message = `deu upvote na sua publicação`;
          break;
        case 'downvote':
          message = `deu downvote na sua publicação`;
          break;
        case 'comentario':
          message = `comentou: "${notification.conteudo}" na sua publicação`;
          break;
        case 'salvar':
          message = `salvou a sua publicação`;
          break;
      }
      return {
        id: uuidv4(),
        message,
        postagemId: notification.postagemId,
        usuario: notification.usuario,
        createdAt: notification.createdAt,
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

    notifications.sort((a, b) => b.createdAt - a.createdAt);

    return notifications;
  }
}
