/* eslint-disable no-undef */
const db = require('../data/db-config');
const request = require('supertest');
const server = require('../api/server');

// ------------------- CLEARING DATABASE ---------------------- //
describe('authRouter', function() {
  beforeAll(async () => {
    await db('coaches').truncate();
  });

  // ------------------- REGISTER ENDPOINT ---------------------- //
  describe('/auth/register', function() {
    it ('should register a new coach and send back a token', () => {
      return request(server)
        .post('/auth/register')
        .send({ first_name: 'Hello', last_name: 'World', email: 'helloworld@email.com', password: 'pass' })
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body.token).not.toBe(undefined);
        });
    });

    it ('should NOT register a user - first name not provided', () => {
      return request(server)
        .post('/auth/register')
        .send({ last_name: 'World', email: 'helloworld@email.com', password: 'pass' })
        .then(res => {
          expect(res.status).toBe(400);
          expect(res.body.token).toBe(undefined);
        });
    });

    it ('should NOT register a user - last name not provided', () => {
      return request(server)
        .post('/auth/register')
        .send({ first_name: 'Hello', email: 'helloworld@email.com', password: 'pass' })
        .then(res => {
          expect(res.status).toBe(400);
          expect(res.body.token).toBe(undefined);
        });
    });

    it ('should NOT register a user - email not provided', () => {
      return request(server)
        .post('/auth/register')
        .send({ first_name: 'Hello', last_name: 'World', password: 'pass' })
        .then(res => {
          expect(res.status).toBe(400);
          expect(res.body.token).toBe(undefined);
        });
    });

    it ('should NOT register a user - password not provided', () => {
      return request(server)
        .post('/auth/register')
        .send({ first_name: 'Hello', last_name: 'World', email: 'helloworld@email.com' })
        .then(res => {
          expect(res.status).toBe(400);
          expect(res.body.token).toBe(undefined);
        });
    });

    it ('should NOT register a user - body not provided', () => {
      return request(server)
        .post('/auth/register')
        .send({ })
        .then(res => {
          expect(res.status).toBe(400);
          expect(res.body.token).toBe(undefined);
        });
    });

  });

  // ------------------- LOGIN ENDPOINT ---------------------- //
  describe('/auth/login', function() {
    it ('should login a user and send back a token', () => {
      return request(server)
        .post('/auth/login')
        .send({ email: 'helloworld@email.com', password: 'pass' })
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body.token).not.toBe(undefined);
        });
    });

    it ('should NOT login a user - wrong email', () => {
      return request(server)
        .post('/auth/login')
        .send({ email: 'wrong@email.com', password: 'pass' })
        .expect(401);
    });

    it ('should NOT login a user - no email', () => {
      return request(server)
        .post('/auth/login')
        .send({ password: 'pass' })
        .expect(400);
    });

    it ('should NOT login a user - wrong password', () => {
      return request(server)
        .post('/auth/login')
        .send({ email: 'helloworld@email.com', password: 'wrongpass' })
        .expect(401);
    });

    it ('should NOT login a user - no password', () => {
      return request(server)
        .post('/auth/login')
        .send({ email: 'helloworld@email.com' })
        .expect(400);
    });

    it ('should NOT login a user - no body', () => {
      return request(server)
        .post('/auth/login')
        .send({ })
        .expect(400);
    });
  });
});

// ------------------- GET ENDPOINT - AUTH GOOGLE ---------------------- //
describe('/auth/google', function() {
  it ('should return 302', () => {
    return request(server)
      .get('/auth/google')
      .then(res => {
        expect(res.status).toBe(302);
      });
  });
});