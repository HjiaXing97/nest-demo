import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface';

class Validate extends ValidationPipe {
  protected mapChildrenToValidationErrors(error: ValidationError, parentPath?: string): ValidationError[] {
    const errors = super.mapChildrenToValidationErrors(error, parentPath);
    errors.map((err) => {
      for (const key in err.constraints) {
        err.constraints[key] = `${err.property}-${err.constraints[key]}`;
      }
    });
    return errors;
  }
}

export default Validate;
