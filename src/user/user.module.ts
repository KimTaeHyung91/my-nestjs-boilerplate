import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './domain/entity/user';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
})
export class UserModule {}
