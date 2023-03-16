import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthUserLoginDto, AuthUserRegisterDto } from 'dto/auth.user.dto';
import { PrismaService } from 'modules/prisma/prisma.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async userRegister(dto: AuthUserRegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        real_password: dto.real_password,
        real_name: dto.real_name,
        password: await hash(dto.password) //密码加密
      }
    });
    delete user.password;
    delete user.real_password;
    return user;
  }

  async userLogin(dto: AuthUserLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username
      }
    });

    if (!user) throw new BadRequestException('用户不存在');

    const hashPassword = await verify(user.password, dto.password); //解密
    if (!hashPassword) throw new BadRequestException('密码错误');
    else return await this.generateToken(user.id, user.username);
  }

  async generateToken(id: number, username: string) {
    return {
      token: await this.jwt.signAsync({
        username,
        subarray: id
      })
    };
  }
}
