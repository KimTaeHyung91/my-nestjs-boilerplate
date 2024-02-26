import { registerAs } from '@nestjs/config';

export default registerAs(
  'dataStore',
  () =>
    ({
      postgresql: {
        host: process.env.POSTGRESQL_HOST,
        port: +process.env.POSTGRESQL_PORT,
        username: process.env.POSTGRESQL_USER_NAME,
        password: process.env.POSTGRESQL_PASSWORD,
        database: process.env.POSTGRESQL_DATABASE,
        schema: process.env.POSTGRESQL_SCHEMA,
      },
    }) as const,
);
