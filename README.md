### NestJs 中的核心模块

- 管道(Pipe)

  - 用于转换、验证、过滤用户输入的数据，类似于请求拦截器
  - 创建管道

    ```ts
    /**
     * 在 NestJS 中，管道是通过创建一个实现 PipeTransform 接口的类来实现的。
     * PipeTransform 接口定义了一个 transform 方法，
     * 该方法接受一个值并返回转换后的值或抛出异常。
     */
    import {
      PipeTransform,
      Injectable,
      BadRequestException
    } from '@nestjs/common';


    @Injectable()
    export class ParseIntPipe implements PipeTransform<string, number> {
      transform(value: string): number {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
          throw new BadRequestException(`"${value}" is not a valid number`);
        }
        return parsedValue;
      }
    }
    ```

  - 在控制器中使用管道

    ```ts
    import { Controller, Get, Param } from '@nestjs/common';
    import { ParseIntPipe } from './parse-int.pipe';

    @Controller('users')
    export class UsersController {
      @Get(':id')
      getUserById(@Param('id', ParseIntPipe) id: number) {
        return { id };
      }
    }
    ```

### 安装 primsa

1. pnpm add prisma-binding @prisma/client mockjs argon2

2. pnpm add -D prisma typescript @types/node @types/mockjs

### 初始化 primsa 工具

1. npx prisma init
2. 执行命令后会创建 primsa 文件夹和.env 文件

### 修改 primsa 数据库配置

1. DATABASE_URL="sqlName://username:password@host:3306/database"

### 生成迁移文件

1. npx prisma migrate dev
2. 执行该命令后会创建迁移文件并在数据库中生产对应的表

### 生成测试数据

- 在 prisma 文件夹下创建 seeds 文件夹 创建 seed.ts 文件
  ```javascript
  import user from './seeds/user';
  async function run() {
    await user();
  }
  run().then(() => {});
  ```
- 在 seeds 文件夹下创建 user 文件用于 mock 数据

  ```javascript
  import { PrismaClient } from '@prisma/client';
  const prisma = new PrismaClient();
  async function user() {
    await prisma.user.create({
      data: {
        email: Random.email(),
        username: Random.cname(),
        password: Random.string(),
        github: Random.url()
      }
    });
  }
  export default user;
  ```

- 在 package.json 文件中创建命令
  ```
  "prisma": {
        "seed": "ts-node prisma/seed.ts"
     },
  ```
- 执行 npx prisma db seed 命令就会自动创建 mock 数据

### 管道验证安装包

- class-transformer 数据转化

```ts
import { plainToInstance } from 'class-transformer';
//通过plainToInstance方法将数据进行转化
const obj = plainToInstance(metadata.metatype, value);
```

- class-validator 数据验证

```ts
import { IsNotEmpty } from 'class-validator';

export default class CreateArticleDto {
  @IsNotEmpty() //非空判断
  title: string;
  @IsNotEmpty()
  content: string;
}
```

### 自定义校验规则

- 创建一个规则校验文件

```ts
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint()
class IsConfirmedRule implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    // 返回true校验成功，否则校验失败
    return value === validationArguments.object['password'];
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return '对比失败';
  }
}

export default IsConfirmedRule;
```

- 创建一个校验 dto 类

```ts
export class registerDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;
  @IsNotEmpty({ message: '密码' })
  password: string;
  @IsNotEmpty({ message: '确认密码' })
  @Validate(IsConfirmedRule) //使用自定义校验
  password_confirmed: string;
}
```

### 使用装饰器进行自定义验证

- 创建一个装饰器验证函数

```ts
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator';
import { PrismaClient } from '@prisma/client';

/**
 * @param table  表名
 * @param validationOptions  配置项
 */
function IsNotExistsRule(table: string, validationOptions: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    // @ts-ignore
    registerDecorator({
      name: 'IsNotExistsRule',
      target: object.constructor,
      propertyName: propertyName, //验证字段
      constraints: [table],
      options: validationOptions,
      validator: {
        async validate(
          value: any,
          validationArguments?: ValidationArguments
        ): Promise<boolean> {
          const prisma = new PrismaClient();
          const user = await prisma.user.findFirst({
            where: {
              [propertyName]: validationArguments.value
            }
          });
          return !Boolean(user);
        }
      }
    });
  };
}

export default IsNotExistsRule;
```

- 在校验类中使用该装饰器

```ts
export class registerDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @isNotExistsRule('user', { message: '用户已存在' }) //使用自定义装饰器
  username: string;
  @IsNotEmpty({ message: '密码' })
  password: string;
  @IsNotEmpty({ message: '确认密码' })
  @Validate(IsConfirmedRule)
  password_confirmed: string;
}
```

