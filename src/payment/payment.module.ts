import { Module } from '@nestjs/common';
import { PaymentService } from './domain/payment.service';
import { PaymentProcessor } from './domain/payment.processor';
import { KakaoPaymentProcessor } from './domain/kakao/kakao-payment.processor';
import { NaverPaymentProcessor } from './domain/naver/naver-payment.processor';
import { TossPaymentProcessor } from './domain/toss/toss-payment.processor';
import { PaymentEnum } from './domain/enum/payment.enum';
import { PaymentServiceImpl } from './domain/payment.service.impl';
import { UserModule } from '../user/user.module';
import { ApiPaymentController } from './interfaces/api-payment.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PaymentInfo } from './domain/entity/payment-info';

@Module({
  imports: [UserModule, MikroOrmModule.forFeature([PaymentInfo])],
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
    { provide: PaymentService, useClass: PaymentServiceImpl },
  ],
  controllers: [ApiPaymentController],
})
export class PaymentModule {}
