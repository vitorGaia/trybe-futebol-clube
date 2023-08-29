import IMatch from '../Interfaces/match/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel {
  private _model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this._model.findAll();
    return dbData.map(({
      id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    }) => ({
      id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    }));
  }
}
