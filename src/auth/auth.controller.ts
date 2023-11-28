import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  SignUp(@Body() input: RegistrationDto) {
    return this.authService.SignUp(input);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  SignIn(@Body() input: LoginDto) {
    return this.authService.SignIn(input);
  }
}
