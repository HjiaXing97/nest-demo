import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

@Catch()
export class FilterValidateFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception instanceof BadRequestException) {
      const responseObj = exception.getResponse() as any;
      const message = Array.isArray(responseObj.message)
        ? responseObj.message?.map((err) => {
            const info = err.split('-');
            return { filed: info[0], message: info[1] };
          })
        : responseObj.message;

      return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message
      });
    }

    return response;
  }
}
