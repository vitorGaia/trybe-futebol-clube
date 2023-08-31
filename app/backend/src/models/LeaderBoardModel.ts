import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import leaderBoardUtils from '../utils/leaderBoardUtils';
import homeLeaderBoardUtils from '../utils/homeLeaderBoardUtils';
import awayLeaderBoardUtils from '../utils/awayLeaderBoardUtils';
import { ILeaderBoard } from '../Interfaces/leaderBoard/ILeaderBoard';

export default class LeaderBoardModel {
  private _matchModel = SequelizeMatch;
  private _teamModel = SequelizeTeam;

  async matchesQuery() {
    const dbData = await this._matchModel.findAll({
      where: { inProgress: false },
      include: [
        { model: this._teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this._teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
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

  async homeFindAll(): Promise<ILeaderBoard[]> {
    const { dbData, teams } = await this.matchesQuery();
    const formmatReturn = teams.map(({ id, teamName }) => ({
      name: teamName,
      totalPoints: homeLeaderBoardUtils.calcTotalPoints(+id, dbData),
      totalGames: homeLeaderBoardUtils.calcTotalGames(+id, dbData),
      totalVictories: homeLeaderBoardUtils.calcTotalVictories(+id, dbData),
      totalDraws: homeLeaderBoardUtils.calcTotalDraws(+id, dbData),
      totalLosses: homeLeaderBoardUtils.calcTotalLosses(+id, dbData),
      goalsFavor: homeLeaderBoardUtils.calcGoalsFavor(+id, dbData),
      goalsOwn: homeLeaderBoardUtils.calcGoalsOwn(+id, dbData),
      goalsBalance: homeLeaderBoardUtils.calcGoalsBalance(+id, dbData),
      efficiency: homeLeaderBoardUtils.calcEfficiency(+id, dbData),
    }));
    return formmatReturn.sort(leaderBoardUtils.orderFunction);
  }

  async awayFindAll(): Promise<ILeaderBoard[]> {
    const { dbData, teams } = await this.matchesQuery();
    const formmatReturn = teams.map(({ id, teamName }) => ({
      name: teamName,
      totalPoints: awayLeaderBoardUtils.calcTotalPoints(+id, dbData),
      totalGames: awayLeaderBoardUtils.calcTotalGames(+id, dbData),
      totalVictories: awayLeaderBoardUtils.calcTotalVictories(+id, dbData),
      totalDraws: awayLeaderBoardUtils.calcTotalDraws(+id, dbData),
      totalLosses: awayLeaderBoardUtils.calcTotalLosses(+id, dbData),
      goalsFavor: awayLeaderBoardUtils.calcGoalsFavor(+id, dbData),
      goalsOwn: awayLeaderBoardUtils.calcGoalsOwn(+id, dbData),
      goalsBalance: awayLeaderBoardUtils.calcGoalsBalance(+id, dbData),
      efficiency: awayLeaderBoardUtils.calcEfficiency(+id, dbData),
    }));
    return formmatReturn.sort(leaderBoardUtils.orderFunction);
  }
}
