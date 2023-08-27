import { Identifiable } from '..';

export interface ILogin {
  email: string;
  password: string;
}

export default interface IUser extends ILogin, Identifiable {
  username: string,
  role: string,
}
