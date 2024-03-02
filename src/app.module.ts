import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import dataStoreConfig from './common/config/data-store.config';
import { Environment } from './common/config/environment';
import { MikroORM } from '@mikro-orm/core';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { BaseEntityRepository } from './common/repository/base-entity.repository';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TransactionalModule } from './common/transactional/transactional.module';
import { MikroOrmEntitiesStorage } from '@mikro-orm/nestjs/mikro-orm.entities.storage';
import { AuthModule } from './auth/auth.module';

const getEntities = () => {
  const arr = [];
  for (const entity of MikroOrmEntitiesStorage.getEntities()) {
    arr.push(entity);
  }

  return arr;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [`env/${Environment.getEnvFile()}`],
      load: [dataStoreConfig],
    }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dataStore =
          configService.get<ConfigType<typeof dataStoreConfig>>('dataStore');
        const { host, port, username, password, database, schema } =
          dataStore.postgresql;

        return {
          driver: PostgreSqlDriver,
          host,
          port,
          user: username,
          password,
          dbName: database,
          schema,
          entities: [...getEntities()],
          discovery: { disableDynamicFileAccess: true },
          debug: Environment.isProduction()
            ? []
            : ['discovery', 'query', 'query-params'],
          registerRequestContext: false,
          extensions: [Migrator],
          metadataProvider: TsMorphMetadataProvider,
          migrations: {
            tableName: 'migrations',
            path: `${__dirname}/migrations`,
            glob: '!(*.d).{js,ts}',
            transactional: true,
            disableForeignKeys: true,
            emit: 'ts',
            generator: TSMigrationGenerator,
            entityRepository: BaseEntityRepository,
          },
          logger: (message: any) => Logger.log(message, 'MikroORM'),
        };
      },
    }),
    UserModule,
    TransactionalModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.migrator.up();
  }

  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
