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
import { HttpModule } from './common/http/http.module';
import { PaymentModule } from './payment/payment.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    DatabaseConnectorModule.register({ type: DataBaseType.POSTGRESQL }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UserModule,
    TransactionalModule,
    AuthModule,
    HttpModule,
    PaymentModule,
    FileModule,
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
