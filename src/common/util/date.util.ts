import '@js-joda/timezone';
import {
  convert,
  DateTimeFormatter,
  LocalDate,
  LocalDateTime,
  nativeJs,
  ZoneId,
} from '@js-joda/core';

export class DateUtil {
  private constructor() {}

  static toDate(from: LocalDate): Date;
  static toDate(from: LocalDateTime): Date;
  static toDate(from: string): Date;

  static toDate(from: any): Date {
    if (typeof from === 'string') {
      return convert(
        LocalDateTime.parse(from),
        ZoneId.systemDefault(),
      ).toDate();
    }

    return convert(from, ZoneId.systemDefault()).toDate();
  }

  static toLocalDate(from: Date): LocalDate {
    return nativeJs(from, ZoneId.systemDefault()).toLocalDate();
  }

  static toLocalDateTime(from: Date): LocalDateTime {
    return nativeJs(from, ZoneId.systemDefault()).toLocalDateTime();
  }

  static toFormat(from: Date) {
    return nativeJs(from, ZoneId.systemDefault())
      .toLocalDateTime()
      .format(DateTimeFormatter.ofPattern('yyyy-MM-dd H:mm:ss'));
  }
}
