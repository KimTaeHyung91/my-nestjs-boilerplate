import { Module } from '@nestjs/common';
import { JwtClient } from './jwt-client';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment } from '../common/config/environment';
import authConfig from '../common/config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [`env/${Environment.getEnvFile()}`],
      load: [authConfig],
    }),
    JwtModule.register({}),
  ],
  providers: [
    {
      provide: JwtClient,
      inject: [ConfigService, JwtService],
      useFactory: (configService: ConfigService, jwtService: JwtService) => {
        return new JwtClient(configService, jwtService);
      },
    },
  ],
})
export class AuthModule {}
