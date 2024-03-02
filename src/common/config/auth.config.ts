import { registerAs } from '@nestjs/config';

export default registerAs(
  'auth',
  () =>
    ({
      jwt: {
        accessTokenSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        refreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      },
    }) as const,
);
