import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private _matchService = new MatchService()) {}

  public async getAllMatches(_req: Request, res: Response) {
    const { status, data } = await this._matchService.getAllMatches();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
