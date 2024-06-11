import 'dotenv/config';

import * as z from 'zod';

const envsSchema = z.object({
  PORT: z.string().transform((val) => +val),
  DATABASE_URL: z.string(),
});

const { data, error } = envsSchema.safeParse(process.env);
if (error) {
  throw new Error(`Configs validation error : ${error.message}`);
}

export const envs = data;
