import { User } from './entity/user';

export const UserWriter = Symbol('UserWriter');

export interface UserWriter {
  save(entity: User): User;
}
