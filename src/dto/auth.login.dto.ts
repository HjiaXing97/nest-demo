import { IsNotEmpty } from 'class-validator';
import IsExistsRule from '../rules/is-exists-rule';

class AuthLoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsExistsRule('user', { message: '用户不存在' })
  username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

export { AuthLoginDto };
