import { UserService } from './user.service';
import { Inject, Injectable } from '@nestjs/common';
import { UserCommand } from './user.command';
import { Transactional } from '../../common/transactional/transactional';
import { UserReader } from './user.reader';
import { UserWriter } from './user.writer';
import { UserMapper } from './user.mapper';
import { UserInfo } from './user.info';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject(UserReader)
    private readonly userReader: UserReader,
    @Inject(UserWriter)
    private readonly userWriter: UserWriter,
    private readonly userMapper: UserMapper,
  ) {}

  @Transactional()
  async registerUser(command: UserCommand.RegisterUser): Promise<string> {
    const user = this.userWriter.save(command.toEntity());
    return user.userToken;
  }

  async retrieveUser(userToken: string): Promise<UserInfo.UserMain> {
    const user = await this.userReader.getUserBy(userToken);

    return this.userMapper.of(user, UserInfo.UserMain);
  }
}
