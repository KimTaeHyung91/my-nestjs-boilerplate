import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseResponse } from '../response/base-response';
import { get } from 'lodash';
import { ServerException, ValidationError } from '@mikro-orm/core';

@Catch()
export class AllCatchExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): any {
    const httpArgumentsHost = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;
    const [exceptionResponse, typeName] = this.errorInfo(exception);

    this.logger.error(
      `[${typeName}]: ${get(
        exceptionResponse,
        'originException.message',
        'Interval Server Error',
      )}`,
    );

    httpAdapter.reply(
      httpArgumentsHost.getResponse(),
      BaseResponse.fail(
        exceptionResponse['message'],
        exceptionResponse['errorCode'],
      ),
    );
  }

  private errorInfo(exception: unknown) {
    if (exception instanceof HttpException) {
      const httpException = exception as unknown as HttpException;
      const httpErrorResponse = httpException.getResponse();
      return [
        {
          message: 'Http Error',
          errorCode: get(httpErrorResponse, 'statusCode'),
          originException: httpErrorResponse,
        },
        HttpException.name,
      ];
    } else if (
      exception instanceof ServerException ||
      exception instanceof ValidationError
    ) {
      return [
        {
          message: 'MikroORM Error',
          errorCode: HttpStatus.INTERNAL_SERVER_ERROR + '',
          originException: exception as unknown as ServerException,
        },
        'MikroORM Error',
      ];
    } else {
      return [
        {
          message: 'Interval Server Error',
          errorCode: HttpStatus.INTERNAL_SERVER_ERROR + '',
        },
        'Unchecked Error',
      ];
    }
  }
}
