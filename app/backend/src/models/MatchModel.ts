import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch, { IMatchGoals } from '../Interfaces/match/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel {
  private _matchModel = SequelizeMatch;
  private _teamModel = SequelizeTeam;

  async findAll(inProgress?: string): Promise<IMatch[]> {
    let whereClause = {};
    if (inProgress) {
      const boolInProgress = inProgress === 'true';
      whereClause = { inProgress: boolInProgress };
    }
    const dbData = await this._matchModel.findAll({
      where: whereClause,
      include: [
        { model: this._teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this._teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData.map((match) => match.dataValues);
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

  async createMatch(
    { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals }: IMatch,
  ): Promise<IMatch | null> {
    const homeTeam = await this._matchModel.findByPk(homeTeamId);
    const awayTeam = await this._matchModel.findByPk(awayTeamId);
    if (!homeTeam || !awayTeam) return null;

    const newMatch = await this._matchModel
      .create({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true });
    const { id, inProgress } = newMatch;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
