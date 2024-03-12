import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  autoMap,
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { User } from './entity/user';
import { ClassConstructor } from 'class-transformer';
import { UserInfo } from './user.info';

@Injectable()
export class UserMapper extends AutomapperProfile {
  constructor(@InjectMapper() readonly mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        User,
        UserInfo.UserMain,
        autoMap('email'),
        forMember(
          (main) => main.createdDt,
          mapFrom((user) => user.getCreatedDt()),
        ),
      );
    };
  }

  of(user: User, target: ClassConstructor<UserInfo.UserMain>) {
    return this.mapper.map(user, User, target);
  }
}
