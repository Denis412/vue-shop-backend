import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { generateId } from 'src/helpers/generate-id.helper';
import { Registration } from './entities/registration.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registration(input: RegistrationDto) {
    // const user = await this.userService.create({ id: generateId(), ...input });
    return this.userService.create({ id: generateId(), ...input });
    // {
    //   user_id: user.id,
    //   email: user.email,
    // };
  }
  async login(input: LoginDto) {
    let user = null;
    try {
      user = await this.userService.findOneByEmail(input.email);
    } catch (error) {
      throw new UnauthorizedException('Пользователь с таким email не найден');
    }

    if (input.password !== user.password) {
      throw new UnauthorizedException('Неверный пароль');
    }
  }
}
