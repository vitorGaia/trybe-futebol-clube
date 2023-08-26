import TeamModel from '../models/TeamModel';
import ITeamModel from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeam from '../Interfaces/teams/ITeam';

export default class TeamService {
  constructor(private _teamModel: ITeamModel = new TeamModel()) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this._teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(teamId: ITeam['id']): Promise<ServiceResponse<ITeam | null>> {
    const team = await this._teamModel.findById(teamId);
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}
