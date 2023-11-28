import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  registration(@Body() input: RegistrationDto) {
    return this.authService.registration(input);
  }

  @Post('login')
  login(@Body() input: LoginDto) {
    return this.authService.login(input);
  }
}
