import IUser from './IUser';

export default interface IUserModel {
  findByEmail(userEmail: IUser['email']): Promise<IUser | null>
}
