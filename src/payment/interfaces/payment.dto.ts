import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export namespace PaymentDto {
  enum RequestPaymentType {
    CARD = 'CARD',
    BANK = 'BANK',
  }

  export class RequestRegisterPaymentInfo {
    @IsNotEmpty()
    @IsEnum(RequestPaymentType)
    readonly type: RequestPaymentType;

    @Expose()
    @IsOptional()
    readonly cardNo: string;

    @Expose()
    @IsOptional()
    readonly accountNo: string;
  }

  export class ResponsePaymentInfoToken {
    @Expose()
    readonly paymentInfoToken: string;
  }

  export class QueryRetrievePaymentInfo {
    @Expose()
    @IsNotEmpty()
    readonly userToken: string;
  }
}
