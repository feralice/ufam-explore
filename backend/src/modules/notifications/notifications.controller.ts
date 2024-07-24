import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':usuarioId')
  @ApiOperation({ summary: 'Get notifications for a user' })
  @ApiParam({ name: 'usuarioId', type: String, description: 'ID do usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notificações retornadas com sucesso',
    type: [String],
  })
  async getNotifications(@Param('usuarioId') usuarioId: string) {
    return this.notificationsService.getNotificationsByUser(usuarioId);
  }
}
