import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

const env = process.env.TEST_ENV || 'dev';

const envFilePath = path.resolve(process.cwd(), `.env.${env}`);

if (!fs.existsSync(envFilePath)) {
  throw new Error(`Env file not found: ${envFilePath}`);
}

dotenv.config({ path: envFilePath });

export const ENV = {
  baseUrl: process.env.BASE_URL as string,
  password: process.env.PASSWORD as string,
  isCI: process.env.CI === 'true',
};
