const dbMatch = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
};

const match = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
};

const matches = [match];

const filteredMatches = [
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeamId": 6,
    "homeTeamGoals": 1,
    "awayTeamId": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Ferroviária"
    },
    "awayTeam": {
      "teamName": "Avaí/Kindermann"
    }
  },
];

const invalidMatchBody = {
  "homeTeamId": 999,
  "homeTeamGoals": 1,
  "awayTeamId": 998,
  "awayTeamGoals": 1,
  "inProgress": false,
};

export default {
  dbMatch,
  match,
  matches,
  filteredMatches,
  invalidMatchBody,
};