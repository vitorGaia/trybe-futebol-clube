import * as bcrypt from 'bcryptjs';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILogin } from '../Interfaces/users/IUser';
import IUserModel from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';
import { IToken } from '../Interfaces/IToken';
import JWT from '../utils/JWT';

export default class UserService {
  constructor(
    private _userModel: IUserModel = new UserModel(),
    private _jwtService = JWT,
  ) {}

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this._userModel.findByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
      }
      const { email } = user;
      const token = this._jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'NOT_FOUND', data: { message: 'User not found' } };
  }
}
