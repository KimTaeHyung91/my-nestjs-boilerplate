import { Module } from '@nestjs/common';
import { PaymentService } from './domain/payment.service';
import { PaymentProcessor } from './domain/payment.processor';
import { KakaoPaymentProcessor } from './domain/kakao/kakao-payment.processor';
import { NaverPaymentProcessor } from './domain/naver/naver-payment.processor';
import { TossPaymentProcessor } from './domain/toss/toss-payment.processor';
import { PaymentEnum } from './domain/enum/payment.enum';
import { PaymentServiceImpl } from './domain/payment.service.impl';

@Module({
  providers: [
    KakaoPaymentProcessor,
    NaverPaymentProcessor,
    TossPaymentProcessor,
    {
      provide: PaymentProcessor,
      inject: [
        KakaoPaymentProcessor,
        NaverPaymentProcessor,
        TossPaymentProcessor,
      ],
      useFactory: (
        kakao: KakaoPaymentProcessor,
        naver: NaverPaymentProcessor,
        toss: TossPaymentProcessor,
      ) => {
        const map = new Map<PaymentEnum.PayType, PaymentProcessor>();
        map.set(PaymentEnum.PayType.KAKAO, kakao);
        map.set(PaymentEnum.PayType.NAVER, naver);
        map.set(PaymentEnum.PayType.TOSS, toss);

        return map;
      },
    },
    {
      provide: PaymentService,
      inject: [PaymentProcessor],
      useFactory: (
        paymentProcessor: Map<PaymentEnum.PayType, PaymentProcessor>,
      ) => {
        return new PaymentServiceImpl(paymentProcessor);
      },
    },
  ],
})
export class PaymentModule {}
