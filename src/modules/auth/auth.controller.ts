import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserRegister } from '../../dto/auth.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* 注册接口 */
  @Post('register')
  userRegister(@Body() body: AuthUserRegister) {
    return body;
  }

  /* 登录接口 */
  @Post('login')
  userLogin(@Body() body: any) {
    return body;
  }
}
