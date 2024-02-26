import { Global, Module } from '@nestjs/common';
import { AopModule } from '@toss/nestjs-aop';
import { TransactionalDecorator } from './transactional-decorator';

@Global()
@Module({
  imports: [AopModule],
  providers: [TransactionalDecorator],
})
export class TransactionalModule {}
