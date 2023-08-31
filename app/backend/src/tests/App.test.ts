import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app, App } from '../app';

describe('App', () => {
  it('Deve iniciar o servidor na porta especificada', () => {
    const PORT = 3002;
    const app = new App();
    const spy = sinon.spy(app.app, 'listen');

    app.start(PORT);

    chai.expect(spy.calledWith(PORT)).to.be.true;
  });

  it('Sever', async () => {
  });
});
