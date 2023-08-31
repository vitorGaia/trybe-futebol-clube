import IMatch from '../Interfaces/match/IMatch';

const calcTotalPoints = (teamId: number, data: IMatch[]) => {
  let totalPoints = 0;
  data.forEach((match) => {
    if (match.homeTeamId === teamId) {
      if (match.homeTeamGoals > match.awayTeamGoals) totalPoints += 3;
      if (match.homeTeamGoals === match.awayTeamGoals) totalPoints += 1;
    }
  });
  return totalPoints;
};

const calcTotalGames = (teamId: number, data: IMatch[]) => {
  let totalGames = 0;
  data.forEach((match) => {
    if (match.homeTeamId === teamId) totalGames += 1;
  });
  return totalGames;
};

const calcTotalVictories = (teamId: number, data: IMatch[]) => {
  let totalVictories = 0;
  data.forEach((match) => {
    if (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals) {
      totalVictories += 1;
    }
  });
  return totalVictories;
};

const calcTotalDraws = (teamId: number, data: IMatch[]) => {
  let totalDraws = 0;
  data.forEach((match) => {
    if (match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals) {
      totalDraws += 1;
    }
  });
  return totalDraws;
};

const calcTotalLosses = (teamId: number, data: IMatch[]) => {
  let totalLosses = 0;
  data.forEach((match) => {
    if (match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals) totalLosses += 1;
  });
  return totalLosses;
};

const calcGoalsFavor = (teamId: number, data: IMatch[]) => {
  let goalsFavor = 0;
  data.forEach((match) => {
    if (match.homeTeamId === teamId) goalsFavor += match.homeTeamGoals;
  });
  return goalsFavor;
};

const calcGoalsOwn = (teamId: number, data: IMatch[]) => {
  let goalsOwn = 0;
  data.forEach((match) => {
    if (match.homeTeamId === teamId) goalsOwn += match.awayTeamGoals;
  });
  return goalsOwn;
};

const calcGoalsBalance = (teamId: number, data: IMatch[]) => (
  calcGoalsFavor(teamId, data) - calcGoalsOwn(teamId, data)
);

const calcEfficiency = (teamId: number, data: IMatch[]) => {
  const totalPoints = calcTotalPoints(teamId, data);
  const totalGames = calcTotalGames(teamId, data);
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return +efficiency.toFixed(2);
};

export default {
  calcTotalPoints,
  calcTotalGames,
  calcTotalVictories,
  calcTotalDraws,
  calcTotalLosses,
  calcGoalsFavor,
  calcGoalsOwn,
  calcGoalsBalance,
  calcEfficiency,
};
