import { PaymentEnum } from './enum/payment.enum';
import { Expose } from 'class-transformer';
import { PaymentInfo } from './entity/payment-info';

export namespace PaymentCommand {
  export class RegisterPaymentInfo {
    @Expose()
    readonly userToken: string;

    @Expose()
    readonly type: PaymentEnum.PaymentInfoType;

    @Expose()
    readonly cardNo?: string;

    @Expose()
    readonly accountNo?: string;

    toEntity(): PaymentInfo {
      return PaymentInfo.of({
        type: this.type,
        cardNo: this.cardNo,
        accountNo: this.accountNo,
      });
    }
  }
}
