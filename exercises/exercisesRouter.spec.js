const db = require('../data/db-config');
const request = require('supertest');
const server = require('../api/server');

let token ;

// ------------------- CLEARING DATABASE And Registering Account---------------------- //
describe('exercisesRouter', function() {
  beforeAll(async() => {
    await db('coaches').truncate();
    await db('exercises').truncate();
    return request(server)
      .post('/auth/register')
      .send({ first_name: 'Hello', last_name: 'World', email: 'helloworld@email.com', password: 'pass' })
      .then(res => {
        expect(res.status).toBe(201);
        token = res.body.token;

      });

  });
  // ------------------- Post request ---------------------- //
  // should this error message return a 401?

  it ('it should add data to exercises db', function() {

    return request(server)
      .post('/exercises')
      .set('Authorization', token)
      .send({name:'Burpees'})
      .then(res => {
        expect(res.status).toBe(201);
      });

  });

  it ('it should not post since no token', function() {

    return request(server)
      .post('/exercises')
      .send({name:'Burpees'})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  it ('it should not add data to db because no body', function() {

    return request(server)
      .post('/exercises')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not add data to db because wrong field', function() {

    return request(server)
      .post('/exercises')
      .set('Authorization', token)
      .send({names:'Burpees'})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  it ('it should not add data to db because missing required field', function() {

    return request(server)
      .post('/exercises')
      .set('Authorization', token)
      .send({name:''})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  // ------------------- Get request ---------------------- //
  it('getting 200 and data from exercises route', function() {
    return request(server)
      .get('/exercises')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject([{name: 'Burpees'}]);
      });
  });

  // this should be a 401 right?
  it ('it should not get since no token', function() {

    return request(server)
      .get('/exercises')

      .then(res => {
        expect(res.status).toBe(400);
      });
  });

});