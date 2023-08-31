import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(private _leaderBoardService = new LeaderBoardService()) {}

  public async getAllLeaderBoards(req: Request, res: Response) {
    const { status, data } = await this._leaderBoardService.getAllLeaderBoards();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAllHomeLeaderBoards(req: Request, res: Response) {
    const { status, data } = await this._leaderBoardService.getAllHomeLeaderBoards();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAllAwayLeaderBoards(req: Request, res: Response) {
    const { status, data } = await this._leaderBoardService.getAllAwayLeaderBoards();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
