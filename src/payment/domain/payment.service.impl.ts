import { PaymentService } from './payment.service';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentEnum } from './enum/payment.enum';
import { PaymentProcessor } from './payment.processor';
import { PaymentCommand } from './payment.command';
import { PaymentInfo } from './payment.info';
import { UserInternalAccess } from '../../user/domain/internal/user-internal-access';
import { Transactional } from '../../common/transactional/transactional';
import { MapperUtil } from '../../common/util/mapper.util';

@Injectable()
export class PaymentServiceImpl implements PaymentService {
  constructor(
    @Inject(PaymentProcessor)
    private readonly paymentStore: Map<PaymentEnum.PayType, PaymentProcessor>,
    @Inject(UserInternalAccess)
    private readonly userInternalAccess: UserInternalAccess,
  ) {}

  async retrievePaymentInfo(
    userToken: string,
  ): Promise<Array<PaymentInfo.PaymentInfoMain>> {
    const user = await this.userInternalAccess.getUserBy(userToken);

    const paymentInfos = await user.getPaymentInfos();
    return paymentInfos.map((e) =>
      MapperUtil.convertTo(PaymentInfo.PaymentInfoMain, e),
    );
  }

  @Transactional()
  async registerPaymentInfo(
    command: PaymentCommand.RegisterPaymentInfo,
  ): Promise<string> {
    const user = await this.userInternalAccess.getUserBy(command.userToken);

    const paymentInfo = command.toEntity();
    user.addPaymentInfo(paymentInfo);

    return paymentInfo.paymentInfoToken;
  }

  async pay(type: PaymentEnum.PayType): Promise<any> {
    const paymentProcessor = this.paymentStore.get(type);

    return await paymentProcessor.execute();
  }
}
