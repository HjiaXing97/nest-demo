import { IsNotEmpty } from 'class-validator';
import IsNoExistsRule from '../common/rules/isNoExists.rule';
import IsConfirmRule from '../common/rules/isConfirm.rule';

class AuthUserRegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsNoExistsRule('user', { message: '用户名已存在' })
  username: string;
  @IsNotEmpty({ message: '真实姓名不能为空' })
  real_name: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
  real_password: string;
  @IsNotEmpty({ message: '确认密码不能为空' })
  @IsConfirmRule('user', { message: '两次密码不一致' })
  password_confirm: string;
}

class AuthUserLoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

export { AuthUserRegisterDto, AuthUserLoginDto };
