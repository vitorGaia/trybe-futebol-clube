import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private _matchService = new MatchService()) {}

  public async getAllMatches(req: Request, res: Response) {
    const { status, data } = await this._matchService.getAllMatches();
    if (Array.isArray(data)) {
      if (req.query.inProgress) {
        const filteredData = data.filter((match) => (
          match.inProgress === (req.query.inProgress === 'true')
        ));
        return res.status(mapStatusHTTP(status)).json(filteredData);
      }
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(mapStatusHTTP(status)).json(data);
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
}
