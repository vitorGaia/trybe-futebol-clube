import LeaderBoardModel from '../models/LeaderBoardModel';
import ILeaderBoardModel from '../Interfaces/leaderBoard/ILeaderBoardModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderBoard } from '../Interfaces/leaderBoard/ILeaderBoard';

export default class LeaderBoardService {
  constructor(private _leaderBoardModel: ILeaderBoardModel = new LeaderBoardModel()) {}

  public async getAllLeaderBoards(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const leaderBoards = await this._leaderBoardModel.findAll();
    return { status: 'SUCCESSFUL', data: leaderBoards };
  }

  public async getAllHomeLeaderBoards(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const leaderBoards = await this._leaderBoardModel.homeFindAll();
    return { status: 'SUCCESSFUL', data: leaderBoards };
  }

  public async getAllAwayLeaderBoards(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const leaderBoards = await this._leaderBoardModel.awayFindAll();
    return { status: 'SUCCESSFUL', data: leaderBoards };
  }
}
