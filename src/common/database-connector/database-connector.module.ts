import { DynamicModule, Logger, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import dataStoreConfig from '../config/data-store.config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Environment } from '../config/environment';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { BaseEntityRepository } from '../repository/base-entity.repository';
import { MikroOrmEntitiesStorage } from '@mikro-orm/nestjs/mikro-orm.entities.storage';
import { join } from 'path';

export enum DataBaseType {
  MYSQL,
  POSTGRESQL,
  MONGO,
}

export type TConnectInfo = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type TDatabaseConnectorOptions = {
  type: DataBaseType;
  testConnectInfo?: TConnectInfo;
};

@Module({})
export class DatabaseConnectorModule {
  static register(options: TDatabaseConnectorOptions): DynamicModule {
    if (options.type !== DataBaseType.POSTGRESQL) {
      throw new Error('Only Support Postgresql, Not Yet Mysql, Mongo');
    }

    return {
      module: DatabaseConnectorModule,
      imports: [
        MikroOrmModule.forRootAsync({
          imports: [
            ConfigModule.forRoot({
              cache: true,
              envFilePath: [`env/${Environment.getEnvFile()}`],
              load: [dataStoreConfig],
            }),
          ],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            const dataStore =
              configService.get<ConfigType<typeof dataStoreConfig>>(
                'dataStore',
              );
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
              entities: [...this.getEntities()],
              discovery: { disableDynamicFileAccess: true },
              debug: Environment.isProduction()
                ? []
                : ['discovery', 'query', 'query-params'],
              registerRequestContext: false,
              extensions: [Migrator],
              metadataProvider: TsMorphMetadataProvider,
              migrations: {
                tableName: 'migrations',
                path: join(__dirname, '/../../', 'migrations'),
                glob: '!(*.d).{js,ts}',
                transactional: true,
                disableForeignKeys: true,
                emit: 'ts',
                generator: TSMigrationGenerator,
              },
              logger: (message: any) => Logger.log(message, 'MikroORM'),
              entityRepository: BaseEntityRepository,
            };
          },
        }),
      ],
    };
  }

  private static getEntities() {
    const arr = [];
    for (const entity of MikroOrmEntitiesStorage.getEntities()) {
      arr.push(entity);
    }

    return arr;
  }
}
