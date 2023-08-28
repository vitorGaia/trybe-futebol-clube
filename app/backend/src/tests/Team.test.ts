import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import teamsMocks from './mocks/Team.mocks';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Testes da rota /teams', function() {
  it('Deve retornar todos os times', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMocks.teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMocks.teams);
  })

  it('Deve retornar um time corretamente quando buscado pelo id', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(teamsMocks.team as any);

    const { status, body } = await chai.request(app)
    .get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMocks.team);
  })

  it('Deve retornar "Team not found" quando busca com um id inexistente', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app)
    .get('/teams/999');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Team not found' });
  })

  afterEach(sinon.restore);
})