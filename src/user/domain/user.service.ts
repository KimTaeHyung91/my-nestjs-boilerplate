import { UserInfo } from './user.info';
import { UserCommand } from './user.command';

export const UserService = Symbol('UserService');

export interface UserService {
  registerUser(command: UserCommand.RegisterUser): Promise<string>;

  retrieveUser(userToken: string): Promise<UserInfo.UserMain>;
}
