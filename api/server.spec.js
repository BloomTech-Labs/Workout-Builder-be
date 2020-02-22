/* eslint-disable no-undef */
const request = require('supertest');
const server = require('../api/server');
const {jestTestOrder} = require('../consts');

module.exports = {
  serverSpecTest
};

function serverSpecTest() {

  describe('server is up check', () => {

    beforeAll( ()=>{
      jestTestOrder.push('serverSpecTest');
    });

    it('should return a 200', () => {
      return request(server)
        .get('/')
        .then(res=> {
          expect(res.status).toBe(200);
          expect(res.body.server).toBe('server is up');
        });
    });
  });

}

test('dummy',()=>{
  let dummy = true;
  expect(dummy).toBe(true);
});