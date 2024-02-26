import { AbstractEntity, TMutable } from './abstract.entity';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { LocalDateTime } from '@js-joda/core';
import { LocalDateTimeType } from './local-date-time.type';

export type TOfMutable<T extends BaseTimeEntity<T>> = Omit<
  TMutable<T>,
  'id' | 'createdAt' | 'updatedAt' | 'mutable'
>;

@Entity({ abstract: true })
export abstract class BaseTimeEntity<T> extends AbstractEntity<T> {
  @PrimaryKey({ autoincrement: true })
  readonly id: number;

  @Property({
    type: LocalDateTimeType,
    onCreate: () => LocalDateTime.now(),
  })
  readonly createdAt: LocalDateTime;

  @Property({
    type: LocalDateTimeType,
    nullable: true,
    onCreate: () => LocalDateTime.now(),
    onUpdate: () => LocalDateTime.now(),
  })
  readonly updatedAt: LocalDateTime;
}
