import { UserInternalAccess } from '../../domain/internal/user-internal-access';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entity/user';
import { BaseEntityRepository } from '../../../common/repository/base-entity.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { NotFoundError } from '@mikro-orm/core';

@Injectable()
export class UserInternalAccessImpl implements UserInternalAccess {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: BaseEntityRepository<User>,
  ) {}

  async getUserBy(userToken: string): Promise<User> {
    return await this.userRepository.findOneOrFail(
      { userToken },
      {
        failHandler: (entityName, where) =>
          new NotFoundError(`${entityName} is not found by ${where}`),
      },
    );
  }
}
