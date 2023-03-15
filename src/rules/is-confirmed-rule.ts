import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
class IsConfirmedRule implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    return value === validationArguments.object['password'];
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return '对比失败';
  }
}

export default IsConfirmedRule;
