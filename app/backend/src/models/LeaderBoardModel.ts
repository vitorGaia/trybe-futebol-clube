import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import leaderBoardUtils from '../utils/leaderBoardUtils';
import { ILeaderBoard } from '../Interfaces/leaderBoard/ILeaderBoard';

export default class LeaderBoardModel {
  private _matchModel = SequelizeMatch;
  private _teamModel = SequelizeTeam;

  async matchesQuery() {
    const dbData = await this._matchModel.findAll({ where: { inProgress: false },
      include: [
        { model: this._teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this._teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ] });

    const teams = await this._teamModel.findAll();
    return { dbData, teams };
  }

  async findAll(): Promise<ILeaderBoard[]> {
    const { dbData, teams } = await this.matchesQuery();
    const formmatReturn = teams.map(({ id, teamName }) => ({
      name: teamName,
      totalPoints: leaderBoardUtils.calcTotalPoints(+id, dbData),
      totalGames: leaderBoardUtils.calcTotalGames(+id, dbData),
      totalVictories: leaderBoardUtils.calcTotalVictories(+id, dbData),
      totalDraws: leaderBoardUtils.calcTotalDraws(+id, dbData),
      totalLosses: leaderBoardUtils.calcTotalLosses(+id, dbData),
      goalsFavor: leaderBoardUtils.calcGoalsFavor(+id, dbData),
      goalsOwn: leaderBoardUtils.calcGoalsOwn(+id, dbData),
      goalsBalance: leaderBoardUtils.calcGoalsBalance(+id, dbData),
      efficiency: leaderBoardUtils.calcEfficiency(+id, dbData),
    }));
    return formmatReturn.sort(leaderBoardUtils.orderFunction);
  }
}
