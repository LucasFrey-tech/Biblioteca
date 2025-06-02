import { BaseStrategy } from './baseStrategy';
import { User } from '../types/user';
export class UsersStrategy extends BaseStrategy<User> {
  constructor(token?: string) {
    super('users', token);
  }
}