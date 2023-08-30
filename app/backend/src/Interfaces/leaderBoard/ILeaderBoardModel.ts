import { ILeaderBoard } from './ILeaderBoard';

export default interface ILeaderBoardModel {
  findAll(): Promise<ILeaderBoard[]>,
}
