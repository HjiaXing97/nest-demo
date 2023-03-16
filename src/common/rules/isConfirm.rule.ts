import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export default function (table: string, validateOptions: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isConfirm',
      target: object.constructor,
      propertyName: propertyName,
      options: validateOptions,
      constraints: [table],
      validator: {
        async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
          const password = validationArguments.object['password'];
          return value === password;
        }
      }
    });
  };
}
