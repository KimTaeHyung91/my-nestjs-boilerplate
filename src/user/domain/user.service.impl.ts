import { UserService } from './user.service';
import { Inject, Injectable } from '@nestjs/common';
import { UserCommand } from './user.command';
import { UserInfo } from './user.info';
import { Transactional } from '../../common/transactional/transactional';
import { UserReader } from './user.reader';
import { MapperUtil } from '../../common/util/mapper.util';
import { UserWriter } from './user.writer';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject(UserReader)
    private readonly userReader: UserReader,
    @Inject(UserWriter)
    private readonly userWriter: UserWriter,
  ) {}

  @Transactional()
  async registerUser(command: UserCommand.RegisterUser): Promise<string> {
    const user = this.userWriter.save(command.toEntity());
    return user.userToken;
  }

  async retrieveUser(userToken: string): Promise<UserInfo.UserMain> {
    const user = await this.userReader.getUserBy(userToken);
    return MapperUtil.convertTo(UserInfo.UserMain, user);
  }
}
