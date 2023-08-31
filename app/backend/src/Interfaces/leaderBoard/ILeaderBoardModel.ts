import { ILeaderBoard } from './ILeaderBoard';

export default interface ILeaderBoardModel {
  findAll(): Promise<ILeaderBoard[]>,
  homeFindAll(): Promise<ILeaderBoard[]>,
  awayFindAll(): Promise<ILeaderBoard[]>,
}
