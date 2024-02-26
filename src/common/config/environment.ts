import * as dotenv from 'dotenv';

dotenv.config();

export class Environment {
  private constructor() {}

  static getEnvFile() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return '.env.development';
    } else if (process.env.NODE_ENV === 'qa') {
      return '.env.qa';
    } else {
      return '.env.production';
    }
  }

  static isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}
