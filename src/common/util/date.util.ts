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

  static toFormat(from: Date): string;
  static toFormat(from: LocalDateTime): string;
  static toFormat(
    from: LocalDateTime,
    format: 'yyyy-MM-dd' | 'yyyy.MM.dd' | 'yyyy-MM-dd H:mm:ss',
  ): string;

  static toFormat(
    from: Date | LocalDateTime,
    format:
      | 'yyyy-MM-dd'
      | 'yyyy.MM.dd'
      | 'yyyy-MM-dd H:mm:ss' = 'yyyy-MM-dd H:mm:ss',
  ) {
    if (from instanceof Date) {
      return nativeJs(from, ZoneId.systemDefault())
        .toLocalDateTime()
        .format(DateTimeFormatter.ofPattern(format));
    } else if (from instanceof LocalDateTime) {
      return from.format(DateTimeFormatter.ofPattern(format));
    }
  }
}
