import { Users } from '@prisma/client';

type PrismaScope<T> = { [K in keyof Partial<T>]: true };

export const userFullReturn: PrismaScope<Users> = {
  id: true,
  email: true,
  username: true,
  firstName: true,
  lastName: true,
  isActive: true,
  isEmailConfirmed: true,
  isSuperAdmin: true,
  isLogued: true,
  sex: true,
  updatedAt: true,
  displayName: true,
  createdAt: true,
  birthdate: true,
  lastLogin: true,
};
