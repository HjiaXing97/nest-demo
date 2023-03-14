import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class HdPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);
    if (errors.length > 0) {
      const message = errors.map((err) => ({
        name: err.property,
        message: Object.values(err.constraints).map((v) => v)
      }));

      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
