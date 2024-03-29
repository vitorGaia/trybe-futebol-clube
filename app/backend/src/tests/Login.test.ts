import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import loginMocks from './mocks/Login.mocks';
import JWT from '../utils/JWT';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Testes da rota /login', function() {
  it('Deve retornar "Token must be a valid token" ao tentar usar a rota GET /login/role com token inválido', async function() {
    sinon.stub(JWT, 'verify').returns('Token must be a valid token');

    const { status, body } = await chai.request(app)
    .get('/login/role')
    .set('authorization', loginMocks.invalidToken as any);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  })

  it('Deve retornar "Token not found" ao tentar user a rota GET /login/role sem um token', async function() {
    const { status, body } = await chai.request(app)
    .get('/login/role');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  })

  it('Deve retornar a role do usuario ao tentar usar a rota GET /login/role com um token válido', async function() {
    sinon.stub(JWT, 'verify').returns(loginMocks.validUserResponse.email);
    sinon.stub(SequelizeUser, 'findOne').resolves(loginMocks.validUserResponse as any);

    const { status, body } = await chai.request(app)
    .get('/login/role')
    .set('authorization', loginMocks.validToken.token);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ role: loginMocks.validUserResponse.role });
  })

  it('Deve retornar "All fields must be filled" caso algum campo da requisição esteja vazio', async function() {
    const { status, body } = await chai.request(app)
    .post('/login')
    .send({});

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  })

  it('Deve retornar "Invalid email or password" caso algum campo da requisição esteja incorreto', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(loginMocks.validUserResponse as any);
    sinon.stub(bcrypt, 'compareSync').returns(false);

    const { status, body } = await chai.request(app)
    .post('/login')
    .send(loginMocks.invalidLoginBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  })

  it('Deve retornar um tolken válido', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(loginMocks.validUserResponse as any);
    sinon.stub(JWT, 'sign').returns(loginMocks.validToken.token);

    const { status, body } = await chai.request(app)
    .post('/login')
    .send(loginMocks.validLoginBody);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(loginMocks.validToken);
  })

  afterEach(sinon.restore);
})