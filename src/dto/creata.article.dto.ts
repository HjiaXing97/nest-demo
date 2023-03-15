import { IsNotEmpty, Length, Validate } from 'class-validator';
import IsConfirmedRule from '../rules/is-confirmed-rule';
import isNotExistsRule from '../rules/is-not-exists-rule';

export default class CreateArticleDto {
  @IsNotEmpty({ message: '标题不能为空' }) //非空判断
  @Length(10, 100, { message: '标题不能少于10个字' })
  title: string;
  @IsNotEmpty({ message: '内容不能为空' })
  content: string;
}

export class registerDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @isNotExistsRule('user', { message: '用户已存在' })
  username: string;
  @IsNotEmpty({ message: '密码' })
  password: string;
  @IsNotEmpty({ message: '确认密码' })
  @Validate(IsConfirmedRule)
  password_confirmed: string;
}
