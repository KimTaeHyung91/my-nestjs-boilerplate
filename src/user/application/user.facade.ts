import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../domain/user.service';
import { UserInfo } from '../domain/user.info';
import { UserCommand } from '../domain/user.command';

@Injectable()
export class UserFacade {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async registerUser(command: UserCommand.RegisterUser): Promise<string> {
    return await this.userService.registerUser(command);
  }

  async retrieveUser(userToken: string): Promise<UserInfo.UserMain> {
    return await this.userService.retrieveUser(userToken);
  }
}
