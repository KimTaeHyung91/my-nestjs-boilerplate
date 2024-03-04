import { Expose, Transform } from 'class-transformer';
import { User } from './entity/user';
import { DateUtil } from '../../common/util/date.util';

export namespace UserInfo {
  export class UserMain {
    @Expose()
    readonly email: string;

    @Expose()
    @Transform(({ obj }) => DateUtil.toFormat((obj as User).createdAt))
    readonly createdDt: string;
  }
}
