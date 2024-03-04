import { Expose } from 'class-transformer';
import { User } from './entity/user';

export namespace UserCommand {
  export class RegisterUser {
    @Expose()
    readonly email: string;

    @Expose()
    readonly password: string;

    toEntity(): User {
      return User.of({
        email: this.email,
        password: this.password,
      });
    }
  }
}
