import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sut = new CountRecipientNotification(notificationsRepository);

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

    const { count } = await sut.execute({
      recipientId: 'example-recipient-id-1',
    });

    expect(count).toEqual(2);
  });
});
