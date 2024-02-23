import '@js-joda/timezone';
import {
  convert,
  LocalDate,
  LocalDateTime,
  nativeJs,
  ZoneId,
} from '@js-joda/core';

export namespace DateUtil {
  export function toDate(from: LocalDate): Date;
  export function toDate(from: LocalDateTime): Date;

  export function toDate(from: any): Date {
    return convert(from, ZoneId.systemDefault()).toDate();
  }

  export function toLocalDate(from: Date): LocalDate {
    return nativeJs(from, ZoneId.systemDefault()).toLocalDate();
  }

  export function toLocalDateTime(from: Date): LocalDateTime {
    return nativeJs(from, ZoneId.systemDefault()).toLocalDateTime();
  }
}
