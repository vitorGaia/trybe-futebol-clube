import IUser from '../Interfaces/users/IUser';
import SequelizeUser from '../database/models/SequelizeUser';
import IUserModel from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private _model = SequelizeUser;

  async findByEmail(userEmail: IUser['email']): Promise<IUser | null> {
    const user = await this._model.findOne({ where: { email: userEmail } });
    if (!user) return null;
    const { id, email, password, username, role } = user;
    return { id, email, password, username, role };
  }
}
