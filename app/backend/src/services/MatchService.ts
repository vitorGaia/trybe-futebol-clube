import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchModel from '../Interfaces/match/IMatchModel';
import MatchModel from '../models/MatchModel';
import IMatch, { IMatchGoals } from '../Interfaces/match/IMatch';

export default class MatchService {
  constructor(private _matchModel: IMatchModel = new MatchModel()) {}

  public async getAllMatches(inProgress?: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = inProgress === 'true' || inProgress === 'false'
      ? await this._matchModel.findAll(inProgress)
      : await this._matchModel.findAll();
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

  public async updateResult(
    id: number,
    data: IMatchGoals,
  ): Promise<ServiceResponse<ServiceMessage | IMatch>> {
    const updateMatch = await this._matchModel.updateResult(id, data);
    if (!updateMatch) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }
    return { status: 'SUCCESSFUL', data: updateMatch };
  }

  public async createMatch(data: IMatch): Promise<ServiceResponse< ServiceMessage | IMatch>> {
    const newMatch = await this._matchModel.createMatch(data);
    if (!newMatch) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    return { status: 'CREATED', data: newMatch };
  }
}
