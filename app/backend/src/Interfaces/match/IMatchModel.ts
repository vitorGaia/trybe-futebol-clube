import IMatch from './IMatch';

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  updateInProgress(id: number, inProgress: boolean): Promise<IMatch | null>,
}
