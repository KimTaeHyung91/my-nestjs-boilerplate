import { assert, beforeAll, describe, it } from 'vitest';
import { Test } from '@nestjs/testing';
import { AppService } from '../src/app.service';

describe('App Test', () => {
  let appService: AppService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get(AppService);
  });

  it('AppService.getHello() is expect `Hello World!`', () => {
    //given
    const expectString = 'Hello World!';

    //when
    const hello = appService.getHello();

    //then
    assert.equal(hello, expectString);
  });
});
