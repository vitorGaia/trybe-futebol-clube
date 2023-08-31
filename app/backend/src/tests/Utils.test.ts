import mapStatusHTTP from '../utils/mapStatusHTTP';
import leaderboardUtils from '../utils/leaderBoardUtils';
import homeLeaderboardUtils from '../utils/homeLeaderBoardUtils';
import awayLeaderBoardUtils from '../utils/awayLeaderBoardUtils';
import * as sinon from 'sinon';
import * as chai from 'chai';
import matchesMocks from './mocks/Match.mocks';
import utilsMock from './mocks/Utils.mock';
import loginMocks from './mocks/Login.mocks';
import * as jsonWebToken from 'jsonwebtoken';
import JWT from '../utils/JWT';
const { expect } = chai;

describe('Utils', function() {
  describe('mapStatusHTTP', function() {
    it('Deve retornar 500 ao mandar um status não mapeado', () => {
      expect(mapStatusHTTP('UNKNOWN_STATUS')).to.be.equal(500);
    });
  });

  describe('JWT', function() {
    it('Função sign deve gerar um token válido', () => {
      const payload = { email: 'user@example.com' };
      sinon.stub(jsonWebToken, 'sign').returns(loginMocks.validToken.token as any);
      const token = JWT.sign(payload);
      expect(token).to.be.a('string').that.is.not.empty;
    });

    it('Função verify deve retornar o payload ao verificar um token válido', () => {
      const payload = { email: 'admin@admin.com' };
      sinon.stub(jsonWebToken, 'sign').returns(loginMocks.validToken.token as any);
      sinon.stub(jsonWebToken, 'verify').returns(payload as any);
      const token = JWT.sign(payload);
      const decoded = JWT.verify(token);
      expect(decoded).to.deep.equal(payload.email);
    });

    it('Função verify deve retornar uma mensagem de erro ao verificar um token inválido', () => {
      const invalidToken = 'invalidToken';
      sinon.stub(jsonWebToken, 'verify').returns(null as any);
      const result = JWT.verify(invalidToken);
      expect(result).to.equal('Token must be a valid token');
    });
  });

  describe('leaderboardUtils', function() {
    it('Deve calcular o total de vitorias do time dentro de casa', () => {
      expect(leaderboardUtils.calcTotalVictories(4, utilsMock.matches as any)).to.be.equal(4);
    });
  
    it('Deve calcular o total de vitorias do time fora de casa', () => {
      expect(leaderboardUtils.calcTotalVictories(1, utilsMock.matches as any)).to.be.equal(1);
    });

    it('deve ordenar corretamente com base no total de vitórias', () => {
      const result = leaderboardUtils.orderFunction(utilsMock.leaderboardTotalVictories[0], utilsMock.leaderboardTotalVictories[1]);
      expect(result).to.equal(-1);
    });

    it('deve ordenar corretamente com base no saldo de gols', () => {
      const result = leaderboardUtils.orderFunction(utilsMock.leaderboardGoalsBalance[0], utilsMock.leaderboardGoalsBalance[1]);
      expect(result).to.equal(-3);
    });

    it('Deve calcular o total de pontos do time', () => {
      expect(leaderboardUtils.calcTotalPoints(4, utilsMock.matches as any)).to.be.equal(12);
    });

    it('Deve calcular o total de jogos do time', () => {
      expect(leaderboardUtils.calcTotalGames(4, utilsMock.matches as any)).to.be.equal(5);
    });

    it('Deve calcular o total de derrotas do time', () => {
      expect(leaderboardUtils.calcTotalLosses(4, utilsMock.matches as any)).to.be.equal(1);
      expect(leaderboardUtils.calcTotalLosses(1, utilsMock.matches as any)).to.be.equal(3);
    });
  });

  describe('homeLeaderboardUtils', function() {
    it('Deve calcular o total de vitorias do time dentro de casa', () => {
      expect(homeLeaderboardUtils.calcTotalVictories(16, matchesMocks.filteredMatchesCalcTotalVictories as any)).to.be.equal(1);
    });

    it('Deve calcular o total de pontos do time jogando em casa', () => {
      expect(homeLeaderboardUtils.calcTotalPoints(4, utilsMock.matches as any)).to.be.equal(6);
    });

    it('Deve calcular o total de derrotas do time jogando em casa', () => {
      expect(homeLeaderboardUtils.calcTotalLosses(7, utilsMock.matches as any)).to.be.equal(1);
    });
  });

  describe('awayLeaderboardUtils', function() {
    it('Deve calcular o total de vitorias do time fora de casa', () => {
      expect(awayLeaderBoardUtils.calcTotalVictories(1, matchesMocks.filteredMatchesCalcTotalVictories as any)).to.be.equal(1);
    });

    it('Deve calcular o total de pontos do time jogando fora de casa', () => {
      expect(awayLeaderBoardUtils.calcTotalPoints(4, utilsMock.matches as any)).to.be.equal(6);
    });

    it('Deve calcular o total de derrotas do time jogando em casa', () => {
      expect(awayLeaderBoardUtils.calcTotalLosses(7, utilsMock.matches as any)).to.be.equal(1);
    });
  });

  afterEach(sinon.restore);
});