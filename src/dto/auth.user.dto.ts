import { IsNotEmpty } from 'class-validator';
import IsNoExistsRule from '../common/rules/isNoExists.rule';

class AuthUserRegister {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsNoExistsRule('user', { message: '用户名已存在' })
  username: string;
  @IsNotEmpty({ message: '真实姓名不能为空' })
  real_name: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
  real_password: string;
}

export { AuthUserRegister };
