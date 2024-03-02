import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MikroOrmMiddleware } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';
import { TransactionalModule } from './common/transactional/transactional.module';
import { AuthModule } from './auth/auth.module';
import {
  DatabaseConnectorModule,
  DataBaseType,
} from './common/database-connector/database-connector.module';

@Module({
  imports: [
    DatabaseConnectorModule.register({ type: DataBaseType.POSTGRESQL }),
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
