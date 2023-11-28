import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { generateId } from 'src/helpers/generate-id.helper';
import { Registration } from './entities/registration.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private jwtService: JwtService,
  ) {}

  async SignUp(input: RegistrationDto) {
    const saltOrRounds = 10;
    input.password = await bcrypt.hash(input.password, saltOrRounds);

    const createdUser = await this.userService.create({
      id: generateId(),
      ...input,
    });

    const { password, ...rest } = createdUser;

    await this.cartService.create({
      id: generateId(),
      user: createdUser,
    });

    return rest;
  }

  async SignIn(input: LoginDto) {
    let user = null;
    try {
      user = await this.userService.findOneByEmail(input.email);
    } catch (error) {
      throw new UnauthorizedException('Пользователь с таким email не найден');
    }

    const isCompare = await bcrypt.compare(input.password, user.password);

    if (!isCompare) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      user_id: user.id,
      token_type: 'Bearer',
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload),
    };
  }
}
