import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { PaymentDto } from './payment.dto';
import { MapperUtil } from '../../common/util/mapper.util';
import { PaymentCommand } from '../domain/payment.command';
import { PaymentService } from '../domain/payment.service';
import { BaseResponse } from '../../common/response/base-response';

@Controller('/api/v1/payment')
export class ApiPaymentController {
  constructor(
    @Inject(PaymentService)
    private readonly paymentService: PaymentService,
  ) {}

  @Post('/info')
  async registerPaymentInfo(
    @Body() request: PaymentDto.RequestRegisterPaymentInfo,
  ) {
    const command = MapperUtil.convertTo(
      PaymentCommand.RegisterPaymentInfo,
      request,
    );

    const paymentInfoToken =
      await this.paymentService.registerPaymentInfo(command);

    const response = MapperUtil.convertTo(PaymentDto.ResponsePaymentInfoToken, {
      paymentInfoToken,
    });

    return BaseResponse.success(response);
  }

  @Get('/info')
  async retrievePaymentInfo(
    @Query() request: PaymentDto.QueryRetrievePaymentInfo,
  ) {
    const paymentInfoMains = await this.paymentService.retrievePaymentInfo(
      request.userToken,
    );

    return BaseResponse.success(paymentInfoMains);
  }
}
