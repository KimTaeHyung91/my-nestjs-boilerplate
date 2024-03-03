import { PaymentService } from './payment.service';
import { Injectable } from '@nestjs/common';
import { PaymentEnum } from './enum/payment.enum';
import { PaymentProcessor } from './payment.processor';

@Injectable()
export class PaymentServiceImpl implements PaymentService {
  constructor(
    private readonly paymentStore: Map<PaymentEnum.PayType, PaymentProcessor>,
  ) {}

  async pay(type: PaymentEnum.PayType): Promise<any> {
    const paymentProcessor = this.paymentStore.get(type);

    return await paymentProcessor.execute();
  }
}
