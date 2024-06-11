import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { envs } from './configs/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  await app.listen(envs.PORT);
}
bootstrap();
