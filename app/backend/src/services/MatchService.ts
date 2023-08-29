import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchModel from '../Interfaces/match/IMatchModel';
import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/match/IMatch';

export default class MatchService {
  constructor(private _matchModel: IMatchModel = new MatchModel()) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this._matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
