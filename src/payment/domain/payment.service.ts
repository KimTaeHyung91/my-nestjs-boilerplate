import { PaymentEnum } from './enum/payment.enum';

export const PaymentService = Symbol('PaymentService');

export interface PaymentService {
  pay(type: PaymentEnum.PayType): Promise<any>;
}
