import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export default class Validate extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    const errors = {};

    validationErrors.forEach((error) => {
      errors[error.property] = Object.values(error.constraints)[0];
    });

    throw new HttpException(
      {
        code: 500,
        message: errors
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
