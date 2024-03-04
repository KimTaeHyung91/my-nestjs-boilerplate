import { UserWriter } from '../domain/user.writer';
import { Injectable } from '@nestjs/common';
import { User } from '../domain/entity/user';
import { BaseEntityRepository } from '../../common/repository/base-entity.repository';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UserWriterImpl implements UserWriter {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: BaseEntityRepository<User>,
  ) {}

  save(entity: User): User {
    return this.userRepository.save(entity);
  }
}
