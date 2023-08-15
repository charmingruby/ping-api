import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sut = new GetRecipientNotifications(notificationsRepository);

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'example-recipient-id-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'example-recipient-id-2',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'example-recipient-id-1',
      }),
    );

    const { notifications } = await sut.execute({
      recipientId: 'example-recipient-id-1',
    });

    expect(notifications.length).toEqual(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id-1' }),
        expect.objectContaining({ recipientId: 'example-recipient-id-1' }),
      ]),
    );
  });
});
