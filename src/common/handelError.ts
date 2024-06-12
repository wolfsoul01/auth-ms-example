import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export function handleError(error: Error, logger?: Logger) {
  logger && logger.log(error);
  throw (
    error ??
    new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
  );
}
