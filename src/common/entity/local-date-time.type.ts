import { Platform, TransformContext, Type } from '@mikro-orm/core';
import { LocalDateTime } from '@js-joda/core';
import { DateUtil } from '../util/date.util';
import { isString } from 'lodash';

export class LocalDateTimeType extends Type<LocalDateTime, Date | string> {
  convertToDatabaseValue(
    value: LocalDateTime,
    platform: Platform,
    context?: TransformContext,
  ): Date {
    return DateUtil.toDate(value);
  }

  convertToJSValue(value: Date | string, platform: Platform): LocalDateTime {
    // value -> timestampz -> casting Date object
    return DateUtil.toLocalDateTime(isString(value) ? new Date(value) : value);
  }
}
