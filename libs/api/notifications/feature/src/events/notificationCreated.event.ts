import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {NotificationsCreatedEvent} from 'libs/api/notifications/util/src/events';
import { NotificationsRepository} from "@mp/api/notifications/data-access";

@EventsHandler(NotificationsCreatedEvent)
export class NotificationsCreatedEventHandler
  implements IEventHandler<NotificationsCreatedEvent>
{
  constructor(private readonly repository: NotificationsRepository) {}

  async handle(event: NotificationsCreatedEvent) {
    await this.repository.createNotifications(event.notifications);
  }
}
