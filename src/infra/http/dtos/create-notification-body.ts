import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty({
    message: 'Recipient ID cannot be blank.',
  })
  @IsUUID()
  recipientId: string;

  @IsNotEmpty({
    message: 'Content cannot be blank.',
  })
  @Length(5, 240)
  content: string;

  @IsNotEmpty({
    message: 'Category cannot be blank.',
  })
  category: string;
}
