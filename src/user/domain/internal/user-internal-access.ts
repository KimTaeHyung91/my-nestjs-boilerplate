import { User } from '../entity/user';

export const UserInternalAccess = Symbol('UserInternalAccess');

export interface UserInternalAccess {
  getUserBy(userToken: string): Promise<User>;
}
