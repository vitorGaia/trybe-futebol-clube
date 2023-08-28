import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(private _userService = new UserService()) {}

  public async login(req: Request, res: Response) {
    const { status, data } = await this._userService.login(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async findByToken(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const { status, data } = await this._userService.findByToken(authorization.split(' ')[1]);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
