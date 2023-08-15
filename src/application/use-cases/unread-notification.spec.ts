import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotification } from './unread-notification';

describe('Read notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const sut = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(null);
  });

  it('should not be able to unread a notification when id does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sut = new UnreadNotification(notificationsRepository);

    expect(() => {
      return sut.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
