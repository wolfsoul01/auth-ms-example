import { Request } from 'express';

export interface CustomerRequest extends Request {
  userId: number;
  origin: string;
}

export enum GeneralConfigKey {
  server_origin_key = 'server_origin_key',
  mail_host = 'mail_host',
  mail_port = 'mail_port',
  mail_user = 'mail_user',
  mail_from = 'mail_from',
  mail_password = 'mail_password',
}

export type app_origin =
  | 'Tecopos'
  | 'Tecopos-Admin'
  | 'Tecopos-Alma'
  | 'Tecopos-Shop'
  | 'Tecopos-Management'
  | 'Tecopos-Landing'
  | 'Tecopos-Server'
  | 'Codyas-Woocommerce'
  | 'Tecopos-Terminal'
  | 'Tecopay-Web'
  | 'Tecopay-App'
  | 'Tecopay-Server'
  | 'Tecopay-App'
  | 'Tecopay-Web'
  | 'Tecopos-Tickets'
  | 'Tecopos-Marketplace'
  | 'Tecopos-Ticket';
