import IMatch, { IMatchGoals } from './IMatch';

export default interface IMatchModel {
  findAll(inProgress?: string): Promise<IMatch[]>,
  updateInProgress(id: number, inProgress: boolean): Promise<IMatch | null>,
  updateResult(id: number, data: IMatchGoals): Promise<IMatch | null>,
  createMatch(data: IMatch): Promise<IMatch | null>,
}
