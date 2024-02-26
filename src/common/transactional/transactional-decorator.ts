import { Aspect, LazyDecorator, WrapParams } from '@toss/nestjs-aop';
import { MikroORM } from '@mikro-orm/core';

export const TRANSACTIONAL_DECORATOR = Symbol('TRANSACTIONAL_DECORATOR');

@Aspect(TRANSACTIONAL_DECORATOR)
export class TransactionalDecorator implements LazyDecorator<any> {
  constructor(private readonly orm: MikroORM) {}

  wrap({ method }: WrapParams<any, any>): any {
    return async (...args: any) =>
      await this.getTransactionContext(method, ...args);
  }

  private async getTransactionContext(method: any, ...args: any) {
    return await this.orm.em.transactional(async () => await method(...args));
  }
}
