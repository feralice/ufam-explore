import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationsRepository } from './notifications.repository';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaService, NotificationsRepository],
})
export class NotificationsModule {}
