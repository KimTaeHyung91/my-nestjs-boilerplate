import { PaymentProcessor } from '../payment.processor';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverPaymentProcessor implements PaymentProcessor {
  async execute(): Promise<any> {
    return 'naver pay call';
  }
}
