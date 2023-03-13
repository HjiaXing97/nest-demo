import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class HdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.title) {
      throw new BadRequestException('文章标题不能为空');
    }

    if (!value.count) {
      throw new BadRequestException('文章内容不能为空');
    }
    return value;
  }
}
