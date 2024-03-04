import { User } from './entity/user';

export const UserReader = Symbol('UserReader');

export interface UserReader {
  getUserBy(userToken: string): Promise<User>;
}
