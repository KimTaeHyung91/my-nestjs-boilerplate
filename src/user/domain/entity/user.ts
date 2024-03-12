import {
  BeforeCreate,
  Cascade,
  Collection,
  Entity,
  Index,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import {
  BaseTimeEntity,
  TOfMutable,
} from '../../../common/entity/base-time.entity';
import { RandomStringUtil } from '../../../common/util/random-string.util';
import * as bcrypt from 'bcrypt';
import { PaymentInfo } from '../../../payment/domain/entity/payment-info';
import { DateUtil } from '../../../common/util/date.util';

@Entity()
@Index({ name: 'user_idx_01', properties: ['userToken'] })
export class User extends BaseTimeEntity<User> {
  @Property()
  readonly userToken: string;

  @Property()
  readonly email: string;

  @Property()
  readonly password: string;

  @OneToMany(() => PaymentInfo, (paymentInfo) => paymentInfo.user, {
    cascade: [Cascade.PERSIST],
  })
  readonly paymentInfos: Collection<PaymentInfo> = new Collection<PaymentInfo>(
    this,
  );

  static of(props: Pick<TOfMutable<User>, 'password' | 'email'>) {
    const _this = new this();

    _this.mutable({
      userToken: RandomStringUtil.generateUUIDForIndex(),
      email: props.email,
      password: props.password,
    });

    return _this;
  }

  addPaymentInfo(paymentInfo: PaymentInfo) {
    this.paymentInfos.add(paymentInfo);
  }

  // lazy loading
  async getPaymentInfos() {
    return await this.paymentInfos.loadItems();
  }

  getCreatedDt() {
    return DateUtil.toFormat(this.createdAt);
  }

  @BeforeCreate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.mutable({ password: hash });
  }
}
