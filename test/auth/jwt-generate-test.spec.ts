import { assert, beforeAll, describe, it } from 'vitest';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../../src/auth/auth.module';
import { JwtClient } from '../../src/auth/jwt-client';

describe('JWT Generate Test', () => {
  let jwtClient: JwtClient;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    jwtClient = module.get(JwtClient);
  });

  it('should be defined, jwtClient', () => {
    assert.isDefined(jwtClient);
  });

  it('엑세스 토큰이 생성되어야된다.', () => {
    // given
    // when
    const accessToken = jwtClient.generateAccessToken(
      'userToken',
      'test@test.com',
      '1s',
    );

    // then
    assert.isString(accessToken);
  });

  it('리프레시 토큰이 생성되어야된다.', () => {
    //given
    //when
    const refreshToken = jwtClient.generateRefreshToken(
      'userToken',
      'test@test.com',
      '1s',
    );

    //then
    assert.isString(refreshToken);
  });
});
