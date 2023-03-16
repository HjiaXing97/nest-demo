import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserLoginDto, AuthUserRegisterDto } from 'dto/auth.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* 注册接口 */
  @Post('register')
  async userRegister(@Body() body: AuthUserRegisterDto) {
    return await this.authService.userRegister(body);
  }

  /* 登录接口 */
  @Post('login')
  async userLogin(@Body() body: AuthUserLoginDto) {
    return await this.authService.userLogin(body);
  }
}
