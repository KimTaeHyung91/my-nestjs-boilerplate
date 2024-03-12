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
import { UserInternalAccess } from './domain/internal/user-internal-access';
import { UserInternalAccessImpl } from './infrastructure/internal/user-internal-access.impl';
import { UserMapper } from './domain/user.mapper';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [
    UserFacade,
    UserMapper,
    { provide: UserService, useClass: UserServiceImpl },
    { provide: UserReader, useClass: UserReaderImpl },
    { provide: UserWriter, useClass: UserWriterImpl },
    { provide: UserInternalAccess, useClass: UserInternalAccessImpl },
  ],
  controllers: [ApiUserController],
  exports: [UserInternalAccess],
})
export class UserModule {}
