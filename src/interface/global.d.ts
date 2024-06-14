import { Request } from 'express';

export interface CustomerRequest extends Request {
  userId: number;
  origin: string;
}
