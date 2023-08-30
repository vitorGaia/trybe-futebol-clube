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

const findByIdResponse = {
  "id": 16,
  "teamName": "São Paulo"
};
const findByIdResponse2 = {
  "id": 8,
  "teamName": "Grêmio"
};

export default {
  dbMatch,
  match,
  matches,
  findByIdResponse,
  findByIdResponse2,
};