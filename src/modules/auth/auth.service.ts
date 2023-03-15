import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUserRegisterDto } from '../../dto/auth.user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async PostRegister({ username, password }: AuthUserRegisterDto) {
    const user = await this.prismaService.createUser({ username, password });
    console.log(user);
    return '';
  }
}
