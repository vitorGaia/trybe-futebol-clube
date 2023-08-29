import IMatch, { IMatchGoals } from '../Interfaces/match/IMatch';
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

  async updateInProgress(id: IMatch['id'], inProgress: boolean): Promise<IMatch | null> {
    const [affectedRows] = await this._matchModel.update({ inProgress }, { where: { id } });
    if (affectedRows === 0) {
      return null;
    }
    return this._matchModel.findByPk(id);
  }

  async updateResult(
    id: IMatch['id'],
    { homeTeamGoals, awayTeamGoals }: IMatchGoals,
  ): Promise<IMatch | null> {
    const [affectedRows] = await this
      ._matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    if (affectedRows === 0) {
      return null;
    }
    return this._matchModel.findByPk(id);
  }

  async createMatch(data: IMatch): Promise<IMatch> {
    const newMatch = await this._matchModel.create({ ...data, inProgress: true });
    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = newMatch;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
