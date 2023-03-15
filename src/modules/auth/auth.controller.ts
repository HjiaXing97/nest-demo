import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserRegisterDto } from '../../dto/auth.user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  PostRegister(@Body() dto: AuthUserRegisterDto) {
    this.authService.PostRegister(dto);
    return dto;
  }
}
