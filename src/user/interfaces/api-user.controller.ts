import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserFacade } from '../application/user.facade';
import { MapperUtil } from '../../common/util/mapper.util';
import { UserDto } from './user.dto';
import { BaseResponse } from '../../common/response/base-response';
import { UserCommand } from '../domain/user.command';

@Controller('/api/v1/user')
export class ApiUserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Post()
  async registerUser(@Body() request: UserDto.RequestRegisterUser) {
    const command = MapperUtil.convertTo(UserCommand.RegisterUser, request);
    const userToken = await this.userFacade.registerUser(command);

    const response = MapperUtil.convertTo(UserDto.UserToken, { userToken });

    return BaseResponse.success(response);
  }

  @Get('/:userToken')
  async retrieveUser(@Param('userToken') userToken: string) {
    const userMain = await this.userFacade.retrieveUser(userToken);

    const response = MapperUtil.convertTo(UserDto.UserMain, userMain);

    return BaseResponse.success(response);
  }
}
