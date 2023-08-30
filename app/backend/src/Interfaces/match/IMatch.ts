import { Identifiable } from '..';
import ITeam from '../teams/ITeam';

export interface IMatchHomeTeam {
  homeTeamId: number,
}

export interface IMatchAwayTeam {
  awayTeamId: number,
}

export interface IMatchGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export default interface IMatch extends
  Identifiable,
  IMatchHomeTeam,
  IMatchAwayTeam,
  IMatchGoals {
  inProgress?: boolean,
  homeTeam?: { teamName: ITeam['teamName'] | null },
  awayTeam?: { teamName: ITeam['teamName'] | null },
}
