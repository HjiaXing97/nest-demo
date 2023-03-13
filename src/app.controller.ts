import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { HdPipe } from './hd/hd.pipe';
import CreateArticleDto from './dto/creata.article.dto';

@Controller()
export class AppController {
  prisma: PrismaClient;

  constructor(private readonly configService: ConfigService) {
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
  add(@Body(HdPipe) dto: CreateArticleDto) {
    return dto;
  }
}
