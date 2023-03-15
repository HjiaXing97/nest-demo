import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import { verify } from 'argon2';
import { AuthLoginDto } from './dto/auth.login.dto';

export interface IUserInfo {
  username: string;
  password: string;
  email: string;
  password_confirmed: string;
}
const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async register(userinfo: IUserInfo) {
    delete userinfo.password_confirmed;
    const password = await argon2.hash(userinfo.password);
    delete userinfo.password;
    await prisma.user.create({
      data: {
        ...userinfo,
        password
      }
    });

    return;
  }

  async login({ username, password }: AuthLoginDto) {
    const user = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        username: username
      }
    });

    if (!user) throw new BadRequestException('用户不存在');
    const psMatch = await verify(user.password, password);
    if (!psMatch) throw new BadRequestException('密码错误');
    delete user.password;
    return user;
  }
}
