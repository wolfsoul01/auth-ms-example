import { Users } from '@prisma/client';
import { Request } from 'express';

export interface CustomerRequest extends Request {
  user: Users;
  origin: string;
}
