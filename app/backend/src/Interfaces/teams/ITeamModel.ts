import ITeam from './ITeam';

export default interface ITeamModel {
  findAll(): Promise<ITeam[]>
  findById(teamId: ITeam['id']): Promise<ITeam | null>
}
