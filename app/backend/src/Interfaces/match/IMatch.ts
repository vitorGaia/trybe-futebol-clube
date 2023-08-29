import { Identifiable } from '..';

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
}
