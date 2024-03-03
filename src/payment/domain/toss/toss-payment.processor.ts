import { PaymentProcessor } from '../payment.processor';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TossPaymentProcessor implements PaymentProcessor {
  async execute(): Promise<any> {
    return 'toss pay call';
  }
}
