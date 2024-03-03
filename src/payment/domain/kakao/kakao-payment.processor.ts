import { PaymentProcessor } from '../payment.processor';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoPaymentProcessor implements PaymentProcessor {
  async execute(): Promise<string> {
    return 'kakao pay call';
  }
}
