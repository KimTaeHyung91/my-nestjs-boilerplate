import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroORM } from '@mikro-orm/core';
import { afterAll, assert, beforeAll, describe, it } from 'vitest';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Test } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { UserEntity } from '../../src/user/domain/entity/user';
import { PaymentInfo } from '../../src/payment/domain/entity/payment-info';

describe('Generate Entity DDL', () => {
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
          entities: [UserEntity, PaymentInfo],
          metadataProvider: TsMorphMetadataProvider,
          allowGlobalContext: true,
          debug: ['info', 'query', 'schema', 'query-params'],
        }),
      ],
    }).compile();

    orm = module.get(MikroORM);

    await orm.getSchemaGenerator().createSchema();
  });

  it('should be defined, orm', async () => {
    assert.isDefined(orm);
    console.log(await orm.getSchemaGenerator().getCreateSchemaSQL());
  });

  afterAll(async () => {
    await orm.getSchemaGenerator().dropSchema();
    await orm.close();
    await dbContainer.stop({ remove: true, removeVolumes: true });
  });
});
