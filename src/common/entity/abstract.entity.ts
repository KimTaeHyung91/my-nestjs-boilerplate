import { entries } from 'lodash';
import { Entity } from '@mikro-orm/core';

export type TMutable<T> = {
  -readonly [P in keyof T]?: T[P];
};

@Entity({ abstract: true })
export abstract class AbstractEntity<T> {
  protected mutable(props: TMutable<T>) {
    for (const [key, value] of entries(props)) {
      (this as any)[key] = value;
    }
  }
}
