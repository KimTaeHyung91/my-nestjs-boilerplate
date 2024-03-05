import { PaymentEnum } from './enum/payment.enum';
import { PaymentCommand } from './payment.command';
import { PaymentInfo } from './payment.info';

export const PaymentService = Symbol('PaymentService');

export interface PaymentService {
  retrievePaymentInfo(
    userToken: string,
  ): Promise<Array<PaymentInfo.PaymentInfoMain>>;

  registerPaymentInfo(
    command: PaymentCommand.RegisterPaymentInfo,
  ): Promise<string>;

  pay(type: PaymentEnum.PayType): Promise<any>;
}
