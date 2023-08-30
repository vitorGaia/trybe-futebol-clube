import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private _matchService = new MatchService()) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const serviceResponse = (inProgress === 'true' || inProgress === 'false')
      ? await this._matchService.getAllMatches(inProgress)
      : await this._matchService.getAllMatches();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this._matchService.finishMatch(+id, false);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateResult(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this._matchService.updateResult(+id, req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { status, data } = await this._matchService.createMatch(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
