import { AggregateRoot } from '@nestjs/cqrs';
import { IProfile } from '@mp/api/profiles/util';
import { INotifications } from 'libs/api/notifications/util/src/interfaces';
import {INotificationBox} from 'libs/api/notifications/util/src/interfaces';
import {InboxCreatedEvent, NotificationsCreatedEvent} from 'libs/api/notifications/util/src/events';

export class Notifications extends AggregateRoot implements INotificationBox {
  constructor(
    public user : IProfile,
    public inbox : INotifications[] | null | undefined
  ) {
    super();
  }
  static fromData(notification: INotificationBox): Notifications {
      const instance = new Notifications(
        notification.user,
        notification.inbox
      );
      return instance;
    }

  sendNotification() {
    this.apply(new NotificationsCreatedEvent(this.toJSON()));
  }

  createInbox() {
    this.inbox.push({
      read : false,
      message : "Welcome to TimeHive",
      url : null,
      notificationID :null,
    })
    this.apply(new InboxCreatedEvent(this.toJSON()));
  }

  toJSON() : INotificationBox{
    const box: INotificationBox = {
      user : this.user,
      inbox : this.inbox
    }
    return box;
  }
}
