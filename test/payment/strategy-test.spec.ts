import { afterAll, assert, beforeAll, describe, it } from 'vitest';
import { Test } from '@nestjs/testing';
import { PaymentModule } from '../../src/payment/payment.module';
import { PaymentService } from '../../src/payment/domain/payment.service';
import { PaymentServiceImpl } from '../../src/payment/domain/payment.service.impl';
import { PaymentEnum } from '../../src/payment/domain/enum/payment.enum';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from '../../src/user/domain/entity/user';
import { PaymentInfo } from '../../src/payment/domain/entity/payment-info';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { MikroORM } from '@mikro-orm/core';

describe('Payment Strategy Test', () => {
  let dbContainer: StartedPostgreSqlContainer;
  let orm: MikroORM;
  let paymentService: PaymentService;

  beforeAll(async () => {
    dbContainer = await new PostgreSqlContainer().start();

    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          driver: PostgreSqlDriver,
          host: dbContainer.getHost(),
          port: dbContainer.getPort(),
          user: dbContainer.getUsername(),
          password: dbContainer.getPassword(),
          dbName: dbContainer.getDatabase(),
          entities: [User, PaymentInfo],
          metadataProvider: TsMorphMetadataProvider,
          allowGlobalContext: true,
          debug: ['info', 'query', 'schema', 'query-params'],
        }),
        PaymentModule,
      ],
    }).compile();

    paymentService = module.get<PaymentServiceImpl>(PaymentService);
  });

  it('should be defined, paymentService', () => {
    assert.isDefined(paymentService);
  });

  it('결제 타입이 카카오이고, 결제가 이뤄져야된다.', async () => {
    //given
    const type = PaymentEnum.PayType.KAKAO;

    //when
    const result = await paymentService.pay(type);

    //then
    assert.equal(result, 'kakao pay call');
  });

  it('결제 타입이 네이버이고, 결제가 이뤄져야된다.', async () => {
    //given
    const type = PaymentEnum.PayType.NAVER;

    //when
    const result = await paymentService.pay(type);

    //then
    assert.equal(result, 'naver pay call');
  });

  it('결제 타입이 토스이고, 결제가 이뤄져야된다.', async () => {
    //given
    const type = PaymentEnum.PayType.TOSS;

    //when
    const result = await paymentService.pay(type);

    //then
    assert.equal(result, 'toss pay call');
  });

  afterAll(async () => {
    await orm.getSchemaGenerator().dropSchema();
    await orm.close();
    await dbContainer.stop({ remove: true, removeVolumes: true });
  });
});
