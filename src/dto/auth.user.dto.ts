import { IsNotEmpty } from 'class-validator';

class AuthUserRegisterDto {
  @IsNotEmpty({ message: '用户名必填' })
  username: string;
  @IsNotEmpty({ message: '密码必填' })
  password: string;
}

export { AuthUserRegisterDto };
