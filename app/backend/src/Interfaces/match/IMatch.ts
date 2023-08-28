import { Identifiable } from '..';

export interface IMatchHomeTeam {
  homeTeamId: number,
  homeTeamGoals: number,
}

export interface IMatchAwayTeam {
  awayTeamId: number,
  awayTeamGoals: number,
}

export default interface IMatch extends
  Identifiable,
  IMatchHomeTeam,
  IMatchAwayTeam {
  inProgress: boolean,
}
