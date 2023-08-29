import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchModel from '../Interfaces/match/IMatchModel';
import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/match/IMatch';

export default class MatchService {
  constructor(private _matchModel: IMatchModel = new MatchModel()) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this._matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatch(
    id: number,
    inProgress: boolean,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const updateMatch = await this._matchModel.updateInProgress(id, inProgress);
    if (!updateMatch) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
