import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUserRegisterDto } from '../../dto/auth.user.dto';
import { user } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private readonly jwt: JwtService) {}
  async PostRegister({ username, password }: AuthUserRegisterDto) {
    const user = await this.prismaService.createUser({ username, password });
    return await this.getToken(user);
  }

  async getToken({ username, id }: user) {
    return {
      token: await this.jwt.signAsync({
        name: username,
        subarray: id
      })
    };
  }

  async PostLogin({ username, password }: AuthUserRegisterDto) {}
}
