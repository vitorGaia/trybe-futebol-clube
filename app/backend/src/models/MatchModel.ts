import IMatch from '../Interfaces/match/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import TeamModel from './TeamModel';

export default class MatchModel {
  private _matchModel = SequelizeMatch;
  private _teamModel = new TeamModel();

  async findAll(): Promise<IMatch[]> {
    const dbData = await this._matchModel.findAll();
    const formattedMatches = await Promise.all(dbData.map(async (match) => {
      const homeTeam = await this._teamModel.findById(match.homeTeamId);
      const awayTeam = await this._teamModel.findById(match.awayTeamId);
      return {
        ...match.dataValues,
        homeTeam: { teamName: homeTeam?.teamName },
        awayTeam: { teamName: awayTeam?.teamName },
      };
    }));
    return formattedMatches;
  }
}
