import { PaymentEnum } from './enum/payment.enum';
import { Expose } from 'class-transformer';

export namespace PaymentInfo {
  export class PaymentInfoMain {
    @Expose()
    readonly type: PaymentEnum.PaymentInfoType;

    @Expose()
    readonly cardNo: string;

    @Expose()
    readonly accountNo: string;
  }
}
