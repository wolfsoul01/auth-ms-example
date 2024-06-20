import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  PayloadTooLargeException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';

export const getResponse = async (
  url: string,
  options: object,
  logger: Logger,
) => {
  const response = await fetch(url, options)
    .then((response) => response.json())
    .catch((err) => {
      logger.error(err.message);
      throw new InternalServerErrorException(err.message);
    });
  console.log(response);
  // Handle errors
  switch (response.statusCode) {
    case 400:
      logger.log(`Bad Request: ${response.message}`);
      throw new BadRequestException(response.message);
    case 401:
      logger.log(`Unauthorized: ${response.message}`);
      throw new UnauthorizedException(response.message);
    case 403:
      logger.log(`Forbidden: ${response.message}`);
      throw new ForbiddenException(response.message);
    case 404:
      logger.log(`Not Found: ${response.message}`);
      throw new NotFoundException(response.message);
    case 408:
      logger.log(`Request Timeout: ${response.message}`);
      throw new RequestTimeoutException(response.message);
    case 409:
      logger.log(`Conflict: ${response.message}`);
      throw new ConflictException(response.message);
    case 413:
      logger.log(`Payload Too Large: ${response.message}`);
      throw new PayloadTooLargeException(response.message);
    case 500:
      logger.log(`Internal Server Error: ${response.message}`);
      throw new InternalServerErrorException(response.message);
  }

  return response;
};

export class Options {
  method?: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';
  body?: string;
  headers?: any;

  constructor(
    method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE',
    headers?: object,
    body?: string,
  ) {
    this.body = body;
    this.headers = headers;
    this.method = method;
  }
}
