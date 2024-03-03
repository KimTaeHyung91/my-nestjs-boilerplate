import { assert, beforeAll, describe, it } from 'vitest';
import { Test } from '@nestjs/testing';
import { PaymentModule } from '../../src/payment/payment.module';
import { PaymentService } from '../../src/payment/domain/payment.service';
import { PaymentServiceImpl } from '../../src/payment/domain/payment.service.impl';
import { PaymentEnum } from '../../src/payment/domain/enum/payment.enum';

describe('Payment Strategy Test', () => {
  let paymentService: PaymentService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [PaymentModule],
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
});
