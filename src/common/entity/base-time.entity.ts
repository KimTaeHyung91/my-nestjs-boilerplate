import { AbstractEntity, TMutable } from './abstract.entity';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { LocalDateTimeType } from './local-date-time.type';
import { LocalDateTime } from '@js-joda/core';

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
    columnType: 'timestamptz',
    onCreate: () => LocalDateTime.now(),
    defaultRaw: 'now()',
  })
  readonly createdAt: LocalDateTime;

  @Property({
    type: LocalDateTimeType,
    columnType: 'timestamptz',
    nullable: true,
    onCreate: () => LocalDateTime.now(),
    onUpdate: () => LocalDateTime.now(),
  })
  readonly updatedAt: LocalDateTime;
}
