import { Identifiable } from '..';

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserRole {
  role: string,
}

export default interface IUser extends Identifiable, ILogin, IUserRole {
  username: string,
}
