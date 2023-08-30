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

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Testes da rota /matches', function() {
  it('Deve retornar "There is no team with such id!" ao fazer um POST na rota /matches com um id de time inexistente', async function() {
    sinon.stub(JWT, 'verify').returns(loginMocks.validUserResponse.email);
    sinon.stub(SequelizeTeam, 'findByPk')
    .onFirstCall().resolves(teamMocks.team as any)
    .onSecondCall().resolves(null);

    const { status, body } = await chai.request(app)
    .post('/matches')
    .send(matchesMocks.invalidMatchBody)
    .set('authorization', loginMocks.validToken.token);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'There is no team with such id!' });
  });

  it('Deve criar uma partida ao fazer um POST na rota /matches', async function() {
    sinon.stub(JWT, 'verify').returns(loginMocks.validUserResponse.email);
    sinon.stub(SequelizeTeam, 'findByPk')
      .onFirstCall().resolves(teamMocks.team as any)
      .onSecondCall().resolves(teamMocks.team2 as any);
    sinon.stub(SequelizeMatch, 'create').resolves(matchesMocks.dbMatch as any);

    const { status, body } = await chai.request(app)
    .post('/matches')
    .send(matchesMocks.match)
    .set('authorization', loginMocks.validToken.token);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(matchesMocks.dbMatch);
  });

  it('Deve retornar "Match not found" ao fazer um PATCH na rota /matches/:id com um id inexistente', async function() {
    sinon.stub(JWT, 'verify').returns(loginMocks.validUserResponse.email);
    sinon.stub(SequelizeMatch, 'update').resolves([0]);

    const { status, body } = await chai.request(app)
    .patch('/matches/1')
    .send(matchesMocks.match)
    .set('authorization', loginMocks.validToken.token);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Match not found' });
  })

  it('Deve atualizar o resultado de uma partida ao fazer um PATCH na rota /matches/:id', async function() {
    sinon.stub(JWT, 'verify').returns(loginMocks.validUserResponse.email);
    sinon.stub(SequelizeMatch, 'update').resolves([1]);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(matchesMocks.match as any);

    const { status, body } = await chai.request(app)
    .patch('/matches/1')
    .send(matchesMocks.match)
    .set('authorization', loginMocks.validToken.token);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMocks.match);
  })

  it('Deve retornar "Match not found" ao fazer um PATCH na rota /matches/:id/finish com um id inexistente', async function() {
    sinon.stub(JWT, 'verify').returns(loginMocks.validUserResponse.email);
    sinon.stub(SequelizeMatch, 'update').resolves([0]);

    const { status, body } = await chai.request(app)
    .patch('/matches/1/finish')
    .set('authorization', loginMocks.validToken.token);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Match not found' });
  })

  it('Deve finalizar uma partida ao fazer um PATCH na rota /matches/:id/finish', async function() {
    sinon.stub(JWT, 'verify').returns(loginMocks.validUserResponse.email);
    sinon.stub(SequelizeMatch, 'update').resolves([1]);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(matchesMocks.match as any);

    const { status, body } = await chai.request(app)
    .patch('/matches/1/finish')
    .set('authorization', loginMocks.validToken.token);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  })

  it('Deve retornar uma lista de jogos filtados ao receber o query param inProgress=true', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMocks.filteredMatches as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMocks.filteredMatches);
  })

  it('Deve retornar todos os jogos', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMocks.matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMocks.matches);
  })

  afterEach(sinon.restore);
})