import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient, user } from '@prisma/client';
import { AuthUserRegisterDto } from '../../dto/auth.user.dto';
import { hash, verify } from 'argon2';

@Injectable()
export class PrismaService {
  constructor(private readonly prisma: PrismaClient) {}
  async createUser({ username, password }: AuthUserRegisterDto) {
    return await this.prisma.user.create({
      data: {
        username,
        password: await hash(password),
        real_password: password
      }
    });
  }

  async userLogin({ username, password }: AuthUserRegisterDto) {
    const user: user = await this.prisma.user.findUnique({
      where: {
        username: username
      }
    });

    if (!user) throw new BadRequestException('用户不存在');
    const psMatch = await verify(user.password, password);
    if (!psMatch) throw new BadRequestException('密码错误');

    return user;
  }
}
