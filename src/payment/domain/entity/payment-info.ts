import {
  BaseTimeEntity,
  TOfMutable,
} from '../../../common/entity/base-time.entity';
import { Entity, Enum, Index, ManyToOne, Property, Ref } from '@mikro-orm/core';
import { PaymentEnum } from '../enum/payment.enum';
import { User } from '../../../user/domain/entity/user';
import { RandomStringUtil } from '../../../common/util/random-string.util';

@Entity()
@Index({ name: 'payment_info_idx_01', properties: ['paymentInfoToken'] })
export class PaymentInfo extends BaseTimeEntity<PaymentInfo> {
  @Property()
  readonly paymentInfoToken: string;

  @Enum(() => PaymentEnum.PaymentInfoType)
  readonly type: PaymentEnum.PaymentInfoType;

  @Property({ nullable: true })
  readonly cardNo: string;

  @Property({ nullable: true })
  readonly accountNo: string;

  @ManyToOne(() => User, {})
  readonly user: Ref<User>;

  private constructor(
    paymentInfoToken: string,
    type: PaymentEnum.PaymentInfoType,
  ) {
    super();
    this.paymentInfoToken = paymentInfoToken;
    this.type = type;
  }

  static of(props: TOfMutable<PaymentInfo>) {
    const _this = new this(RandomStringUtil.generateUUIDForIndex(), props.type);

    if (_this.type === PaymentEnum.PaymentInfoType.CARD) {
      _this.mutable({ cardNo: props.cardNo });
    } else {
      _this.mutable({ accountNo: props.accountNo });
    }

    return _this;
  }
}
