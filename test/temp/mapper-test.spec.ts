import { assert, beforeAll, describe, it } from 'vitest';
import { Test } from '@nestjs/testing';
import { DateTimeFormatter, LocalDateTime } from '@js-joda/core';
import {
  AutomapperModule,
  AutomapperProfile,
  InjectMapper,
} from '@automapper/nestjs';
import { AutoMap, classes } from '@automapper/classes';
import { Injectable } from '@nestjs/common';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { ClassConstructor } from 'class-transformer';

class Delivery {
  readonly id: number = 1;
  readonly city: string = '서울';
  readonly streetAddress: string;
  readonly numberingAddress: string = '강남구 홍길동 11-11 3층';

  getFullNumberingAddress() {
    return `${this.city}시 ${this.numberingAddress}`;
  }
}

class User {
  @AutoMap()
  readonly id: number = 1;

  @AutoMap()
  readonly name: string = 'name';

  @AutoMap()
  readonly email: string = 'email';

  @AutoMap()
  readonly createdAt: LocalDateTime = LocalDateTime.now();

  @AutoMap()
  readonly updatedAt: LocalDateTime = LocalDateTime.now();

  @AutoMap()
  readonly delivery: Delivery = new Delivery();

  getCreatedAt(): string {
    return this.createdAt.format(DateTimeFormatter.ofPattern('yyyy-MM-dd'));
  }

  getUserToken() {
    return Buffer.from(`user_${this.id}`).toString('base64');
  }
}

namespace UserInfo {
  export class Main {
    @AutoMap()
    readonly name: string;

    @AutoMap()
    readonly email: string;

    @AutoMap()
    readonly createdDt: string;

    @AutoMap()
    readonly deliveryInfo: string;
  }

  export class UserTokenInfo {
    @AutoMap()
    readonly userToken: string;
  }
}

const UserInfoMapper = Symbol('UserInfoMapper');

interface UserInfoMapper {
  of(source: User, target: ClassConstructor<UserInfo.Main>): UserInfo.Main;

  of(
    source: User,
    target: ClassConstructor<UserInfo.UserTokenInfo>,
  ): UserInfo.UserTokenInfo;
}

@Injectable()
class UserInfoMapperImpl extends AutomapperProfile implements UserInfoMapper {
  constructor(@InjectMapper('classes') mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        User,
        UserInfo.Main,
        forMember(
          (main) => main.createdDt,
          mapFrom((user) => user.getCreatedAt()),
        ),
        forMember(
          (main) => main.deliveryInfo,
          mapFrom((user) => user.delivery.getFullNumberingAddress()),
        ),
      );
      createMap(
        mapper,
        User,
        UserInfo.UserTokenInfo,
        forMember(
          (userTokenInfo) => userTokenInfo.userToken,
          mapFrom((user) => user.getUserToken()),
        ),
      );
    };
  }

  of(source: User, target: any): any {
    return this.mapper.map(source, User, target);
  }
}

describe('AutoMapper Test', () => {
  let mapper: UserInfoMapper;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot([
          { name: 'classes', strategyInitializer: classes() },
        ]),
      ],
      providers: [
        {
          provide: UserInfoMapper,
          useClass: UserInfoMapperImpl,
        },
      ],
    }).compile();

    mapper = module.get(UserInfoMapper);
  });

  it('strategy: classes, user convert to userinfo.main', () => {
    //given
    // const main = mapper.profile;

    const user = new User();

    //when
    const main = mapper.of(new User(), UserInfo.Main);

    //then
    assert.instanceOf(main, UserInfo.Main);
    assert.equal(main.name, user.name);
    assert.equal(main.email, user.email);
    assert.equal(main.createdDt, user.getCreatedAt());
    assert.equal(main.deliveryInfo, user.delivery.getFullNumberingAddress());
  });

  it('strategy: classes, user convert to userinfo.userTokenInfo', () => {
    //given
    // const main = mapper.profile;

    const user = new User();

    //when
    const main = mapper.of(new User(), UserInfo.UserTokenInfo);

    //then
    assert.instanceOf(main, UserInfo.UserTokenInfo);
    assert.equal(main.userToken, user.getUserToken());
  });
});
