import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import CreateArticleDto, { registerDto } from './dto/creata.article.dto';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AppService, IUserInfo } from './app.service';

@Controller()
export class AppController {
  prisma: PrismaClient;

  constructor(private readonly configService: ConfigService, private readonly appService: AppService) {
    this.prisma = new PrismaClient();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  @Post('add')
  add(@Body() dto: CreateArticleDto) {
    return dto;
  }

  @Post('register')
  async register(@Body() dto: registerDto) {
    await this.appService.register(dto as any as IUserInfo);
    return dto;
  }

  @Post('login')
  login(@Body() dto: AuthLoginDto) {
    return this.appService.login(dto);
  }
}
