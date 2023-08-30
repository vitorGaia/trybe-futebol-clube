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
}

// const formatLeaderBoards = leaderBoards.map((leaderBoard) => ({
//   name: leaderBoard.name,
//   totalPoints: leaderBoard.totalPoints,
//   totalGames: leaderBoard.totalGames,
//   totalVictories: leaderBoard.totalVictories,
//   totalDraws: leaderBoard.totalDraws,
//   totalLosses: leaderBoard.totalLosses,
//   goalsFavor: leaderBoard.goalsFavor,
//   goalsOwn: leaderBoard.goalsOwn,
// }));
