import { AbstractEntity, TMutable } from './abstract.entity';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { DateUtil } from '../util/date.util';
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
    type: 'timestamptz',
    onCreate: () => DateUtil.toDate(LocalDateTime.now()),
  })
  readonly createdAt: Date;

  @Property({
    type: 'timestamptz',
    nullable: true,
    onCreate: () => DateUtil.toDate(LocalDateTime.now()),
    onUpdate: () => DateUtil.toDate(LocalDateTime.now()),
  })
  readonly updatedAt: Date;
}
