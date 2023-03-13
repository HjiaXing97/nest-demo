import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { HdPipe } from './hd/hd.pipe';

@Controller()
export class AppController {
  prisma: PrismaClient;

  constructor(private readonly configService: ConfigService) {
    this.prisma = new PrismaClient();
  }

  @Get(':id')
  get(@Param('id', HdPipe) id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    });
  }
}
