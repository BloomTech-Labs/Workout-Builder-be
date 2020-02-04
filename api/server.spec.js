/* eslint-disable no-undef */
const request = require('supertest');
const server = require('../api/server');

describe('server is up check', () => {
  it('should return a 200', () => {
    return request(server)
      .get('/')
      .then(res=> {
        expect(res.status).toBe(200);
        expect(res.body.server).toBe('server is up');
      });
  });
});

