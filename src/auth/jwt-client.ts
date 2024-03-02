import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import authConfig from '../common/config/auth.config';

@Injectable()
export class JwtClient {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(userToken: string, email: string, expiresIn = '1h') {
    const {
      jwt: { accessTokenSecretKey },
    } = this.configService.get<ConfigType<typeof authConfig>>('auth');

    return this.jwtService.sign(
      { email, sub: userToken },
      {
        secret: accessTokenSecretKey,
        expiresIn,
      },
    );
  }

  generateRefreshToken(userToken: string, email: string, expiresIn = '2w') {
    const {
      jwt: { refreshTokenSecretKey },
    } = this.configService.get<ConfigType<typeof authConfig>>('auth');

    return this.jwtService.sign(
      { email, sub: userToken },
      {
        secret: refreshTokenSecretKey,
        expiresIn,
      },
    );
  }
}
