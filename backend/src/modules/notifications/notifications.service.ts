import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async getNotificationsByUser(usuarioId: string) {
    const upvotes =
      await this.notificationsRepository.findUpvotesByUser(usuarioId);
    const downvotes =
      await this.notificationsRepository.findDownvotesByUser(usuarioId);
    const comentarios =
      await this.notificationsRepository.findCommentsByUser(usuarioId);
    const salvos =
      await this.notificationsRepository.findSavedPostsByUser(usuarioId);

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
          message = `@${notification.usuario.username} comentou na sua publicação`;
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

    return notifications;
  }
}
