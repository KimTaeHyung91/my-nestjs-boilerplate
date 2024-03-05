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

  private constructor(userToken: string, email: string, password: string) {
    super();
    this.userToken = userToken;
    this.email = email;
    this.password = password;
  }

  static of(props: Pick<TOfMutable<User>, 'password' | 'email'>) {
    return new this(
      RandomStringUtil.generateUUIDForIndex(),
      props.email,
      props.password,
    );
  }

  addPaymentInfo(paymentInfo: PaymentInfo) {
    this.paymentInfos.add(paymentInfo);
  }

  // lazy loading
  async getPaymentInfos() {
    return await this.paymentInfos.loadItems();
  }

  @BeforeCreate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.mutable({ password: hash });
  }
}
