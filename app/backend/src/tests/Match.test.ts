import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import matchesMocks from './mocks/Match.mocks';
import TeamModel from '../models/TeamModel';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;
const teamModel = new TeamModel();

describe('Testes da rota /matches', function() {
  it('Deve retornar todos os jogos', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMocks.dbMatch as any);
    sinon.stub(teamModel, 'findById')
    .resolves()
    .onFirstCall()
    .resolves(matchesMocks.findByIdResponse as any)
    .onSecondCall()
    .resolves(matchesMocks.findByIdResponse2 as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMocks.matches);
  })

  afterEach(sinon.restore);
})