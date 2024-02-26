import { Platform, TransformContext, Type } from '@mikro-orm/core';
import { LocalDateTime } from '@js-joda/core';
import { DateUtil } from '../util/date.util';

export class LocalDateTimeType extends Type<LocalDateTime, Date> {
  convertToDatabaseValue(
    value: LocalDateTime,
    platform: Platform,
    context?: TransformContext,
  ): Date {
    return DateUtil.toDate(value);
  }

  convertToJSValue(value: Date, platform: Platform): LocalDateTime {
    return DateUtil.toLocalDateTime(value);
  }
}
