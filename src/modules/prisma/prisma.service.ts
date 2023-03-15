import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthUserRegisterDto } from '../../dto/auth.user.dto';
import { hash } from 'argon2';

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
}
