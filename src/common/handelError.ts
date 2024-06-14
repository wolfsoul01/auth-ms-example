import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export function handleError(error: HttpException, logger?: Logger) {
  logger && logger.log(error);
  throw (
    new HttpException(error.message, error.getStatus()) ??
    new InternalServerErrorException()
  );
}
