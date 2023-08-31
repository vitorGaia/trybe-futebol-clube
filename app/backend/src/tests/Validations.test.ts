import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Testes do middleware de validações', function() {
  it('validateLogin deve retornar "All fields must be filled" ao receber um body sem email ou password', function() {
    const req = { body: { email: '', password: '' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    Validations.validateLogin(req as any, res as any, next as any);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: 'All fields must be filled' })).to.be.true;
  })

  it('validateLogin deve retornar "Invalid email or password" ao receber um body com email ou password inválidos', function() {
    const req = { body: { email: 'email', password: '123' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    Validations.validateLogin(req as any, res as any, next as any);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Invalid email or password' })).to.be.true;
  })

  it('validateToken deve retornar "Token not found" ao receber um header sem token', function() {
    const req = { headers: { authorization: '' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    Validations.validateToken(req as any, res as any, next as any);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Token not found' })).to.be.true;
  })

  it('validateToken deve retornar "Token must be a valid token" ao receber um token inválido', function() {
    const req = { headers: { authorization: 'laulaulaulaulau' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    Validations.validateToken(req as any, res as any, next as any);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Token must be a valid token' })).to.be.true;
  });

  it('validateNewMatch deve retornar "It is not possible to create a match with two equal teams" ao receber um body com dois ids iguais', function() {
    const req = { body: { homeTeamId: 1, awayTeamId: 1 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    Validations.validateNewMatch(req as any, res as any, next as any);

    expect(res.status.calledWith(422)).to.be.true;
    expect(res.json.calledWith({ message: 'It is not possible to create a match with two equal teams' })).to.be.true;
  })

  afterEach(sinon.restore);
})