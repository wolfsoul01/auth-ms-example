import { Global, Injectable } from '@nestjs/common';
import { GeneralConfigs } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { GeneralConfigKey } from 'src/interface/global';
interface GeneralConfig {
  key: string;
  value: string;
}
@Global()
@Injectable()
export class ConfigService {
  constructor(private readonly prisma: PrismaService) {}
  getAllowedOrigins(): string[] {
    return ['Tecopos', 'Tecopos-Admin'];
  }

  getConfig(key: GeneralConfigKey, origin?: string) {
    const where: Partial<GeneralConfigs> = {};

    if (origin) where.origin = origin;

    return this.prisma.generalConfigs.findFirst({
      where: {
        key,
        isPublic: false,
        ...where,
      },
    });
  }

  async getEmailConfig() {
    const configsToSearch = [
      'mail_host',
      'mail_port',
      'mail_user',
      'mail_from',
      'mail_password',
    ];

    const promises: Promise<GeneralConfig | null>[] = [];
    const emailConfigObject: Record<string, any> = {};
    configsToSearch.forEach((item) => {
      promises.push(
        this.prisma.generalConfigs.findFirst({
          where: {
            key: item,
          },
        }),
      );
    });

    try {
      const results = await Promise.all(promises);
      results.forEach((result, index) => {
        const configKey = configsToSearch[index];
        emailConfigObject[configKey] = result?.value;
      });
      return emailConfigObject;
    } catch (error) {
      throw error;
    }
  }
}
