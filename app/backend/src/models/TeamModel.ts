import ITeam from '../Interfaces/teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeamModel from '../Interfaces/teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private _model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this._model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }
}
