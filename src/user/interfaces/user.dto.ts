import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export namespace UserDto {
  export class RequestRegisterUser {
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @Expose()
    @IsNotEmpty()
    readonly password: string;
  }

  export class UserMain {
    @Expose()
    readonly email: string;

    @Expose()
    readonly createdDt: string;
  }

  export class UserToken {
    @Expose()
    readonly userToken: string;
  }
}
