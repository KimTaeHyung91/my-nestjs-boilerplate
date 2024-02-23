import { assert, describe, it } from 'vitest';
import { LocalDate, LocalDateTime } from '@js-joda/core';
import { DateUtil } from '../../../src/common/util/date.util';

describe('DateUtil Test', () => {
  it('LocalDate 객체를 Date 객체로 변환된어야된다', () => {
    //given
    const now = LocalDate.now();

    //when
    const date = DateUtil.toDate(now);

    //then
    assert.instanceOf(date, Date);
  });

  it('LocalDateTime 객체를 Date 객체로 변환된어야된다', () => {
    //given
    const now = LocalDateTime.now();

    //when
    const date = DateUtil.toDate(now);

    //then
    assert.instanceOf(date, Date);
  });

  it('Date 객체를 LocalDate 객체로 변환된어야된다', () => {
    //given
    const now = new Date();

    //when
    const localDate = DateUtil.toLocalDate(now);

    //then
    assert.instanceOf(localDate, LocalDate);
  });

  it('Date 객체를 LocalDateTime 객체로 변환된어야된다', () => {
    //given
    const now = new Date();

    //when
    const localDate = DateUtil.toLocalDateTime(now);

    //then
    assert.instanceOf(localDate, LocalDateTime);
  });
});
