import * as bcrypt from 'bcryptjs';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILogin, IUserRole } from '../Interfaces/users/IUser';
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
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const { email } = user;
    const token = this._jwtService.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async findByToken(authorization: IToken['token']):
  Promise<ServiceResponse< ServiceMessage | IUserRole >> {
    const email = this._jwtService.verify(authorization);
    const user = await this._userModel.findByEmail(email as string);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }
    const { role } = user;
    return { status: 'SUCCESSFUL', data: { role } };
  }
}
