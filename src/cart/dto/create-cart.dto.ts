import { Expose, Type } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

export class CreateCartDto {
  id: string;

  @Type(() => User)
  @Expose()
  user: User;
}
