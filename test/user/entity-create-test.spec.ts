import { afterAll, assert, beforeAll, describe, it } from 'vitest';
import { Test } from '@nestjs/testing';
import { MikroORM } from '@mikro-orm/core';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../../src/user/domain/entity/user';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

describe('User Creat Test', () => {
  let dbContainer: StartedPostgreSqlContainer;
  let orm: MikroORM;

  beforeAll(async () => {
    dbContainer = await new PostgreSqlContainer().start();

    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          driver: PostgreSqlDriver,
          host: dbContainer.getHost(),
          port: dbContainer.getPort(),
          user: dbContainer.getUsername(),
          password: dbContainer.getPassword(),
          dbName: dbContainer.getDatabase(),
          entities: [User],
          allowGlobalContext: true,
          metadataProvider: TsMorphMetadataProvider,
          debug: ['info', 'query', 'query-params'],
        }),
      ],
    }).compile();

    orm = module.get(MikroORM);

    await orm.getSchemaGenerator().createSchema();
  });

  it('should be defined, orm', () => {
    assert.isDefined(orm);
  });

  it('유저 정보는 저장되어야된다.', async () => {
    //given
    const email = 'test@test.com';
    const user = User.of({
      password: '1234',
      email,
    });

    //when
    orm.em.persist(user);
    await orm.em.flush();

    //then
    assert.equal(user.id, 1);
    assert.equal(user.email, email);
  });

  afterAll(async () => {
    await orm.getSchemaGenerator().dropSchema();
    await orm.close();
    await dbContainer.stop({ remove: true, removeVolumes: true });
  });
});
