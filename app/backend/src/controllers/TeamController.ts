import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(private _teamService = new TeamService()) {}

  public async getAllTeams(req: Request, res: Response) {
    const { status, data } = await this._teamService.getAllTeams();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
