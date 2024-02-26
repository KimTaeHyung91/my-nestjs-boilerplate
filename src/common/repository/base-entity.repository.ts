import { EntityRepository } from '@mikro-orm/core';
import { AbstractEntity } from '../entity/abstract.entity';

export class BaseEntityRepository<
  T extends object,
> extends EntityRepository<T> {
  save<T extends AbstractEntity<T>>(entity: T): T {
    this.em.persist(entity);
    return entity;
  }
}
