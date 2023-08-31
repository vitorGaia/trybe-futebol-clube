import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import matchesMocks from './mocks/Match.mocks';
import SequelizeTeam from '../database/models/SequelizeTeam';
import JWT from '../utils/JWT';
import loginMocks from './mocks/Login.mocks';
import teamMocks from './mocks/Team.mocks';
import LeaderboardMock from './mocks/Leaderboard.mock';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Testes da rota /leaderboard', function() {
  it('Deve retornar todos os placares corretamente na rota /leaderboard', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMocks.matches as any);
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamMocks.teams as any);

    const { status, body } = await chai.request(app).get('/leaderboard');    

    expect(status).to.equal(200);
    expect(body).to.deep.equal(LeaderboardMock.leaderBoardResponse);
  })

  it('Deve retornar todos os placares corretamente na rota /leaderboard/home', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMocks.matches as any);
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamMocks.teams as any);

    const { status, body } = await chai.request(app).get('/leaderboard/home');    

    expect(status).to.equal(200);
    expect(body).to.deep.equal(LeaderboardMock.leaderBoardHomeResponse);
  })

  it('Deve retornar todos os placares corretamente na rota /leaderboard/away', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMocks.matches as any);
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamMocks.teams as any);

    const { status, body } = await chai.request(app).get('/leaderboard/away');    

    expect(status).to.equal(200);
    expect(body).to.deep.equal(LeaderboardMock.leaderBoardAwayResponse);
  })

  afterEach(sinon.restore);
})