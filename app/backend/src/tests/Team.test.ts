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

  afterEach(function() {
    sinon.restore()
  })
})