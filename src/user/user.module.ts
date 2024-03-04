import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './domain/entity/user';
import { ApiUserController } from './interfaces/api-user.controller';
import { UserService } from './domain/user.service';
import { UserServiceImpl } from './domain/user.service.impl';
import { UserReader } from './domain/user.reader';
import { UserReaderImpl } from './infrastructure/user.reader.impl';
import { UserWriter } from './domain/user.writer';
import { UserWriterImpl } from './infrastructure/user.writer.impl';
import { UserFacade } from './application/user.facade';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [
    UserFacade,
    { provide: UserService, useClass: UserServiceImpl },
    { provide: UserReader, useClass: UserReaderImpl },
    { provide: UserWriter, useClass: UserWriterImpl },
  ],
  controllers: [ApiUserController],
})
export class UserModule {}
