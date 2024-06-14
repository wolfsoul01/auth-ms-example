import { Global, Module } from '@nestjs/common';
import { ConfigService } from './configs.service';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
