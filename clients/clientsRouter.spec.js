/* eslint-disable no-undef */
const db = require('../data/db-config');
const request = require('supertest');
const server = require('../api/server');

let token ;

// ------------------- CLEARING DATABASE and Registering Account---------------------- //
describe('clientsRouter', function() {
  beforeAll(async() => {
    await db('coaches').truncate();
    await db('clients').truncate();
    return request(server)
      .post('/auth/register')
      .send({ first_name: 'Hello2', last_name: 'World2', email: 'helloworld2@email.com', password: 'pass' })
      .then(res => {
        expect(res.status).toBe(201);
        token = res.body.token;

      });

  });
  // ------------------- Post request ---------------------- //

  it ('it should add data to clients db', function() {

    return request(server)
      .post('/clients')
      .set('Authorization', token)
      .send({first_name:'tod',last_name:'Smith',email:'ts@gmail.com'})

      .then(res => {
        expect(res.status).toBe(201);
      });

  });
  // should this error message return a 401?
  it ('it should not post since no token', function() {

    return request(server)
      .post('/clients')
      .send({first_name:'jerry',last_name:'Smiths',email:'js@gmail.com'})

      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  it ('it should not add data to db because no body', function() {

    return request(server)
      .post('/clients')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not add data to db because wrong field', function() {

    return request(server)
      .post('/clients')
      .set('Authorization', token)
      .send({first_names:'jerry',last_name:'Smiths',email:'js@gmail.com'})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  it ('it should not add data to db because missing required field', function() {

    return request(server)
      .post('/clients')
      .set('Authorization', token)
      .send({first_name:'',last_name:'Smiths',email:'js@gmail.com'})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  // ------------------- Get request for all clients for one coach ---------------------- //

  // seeding a 2nd client
  it('it should add another client for get all', function() {
    return request(server)
      .post('/clients')
      .set('Authorization', token)
      .send({first_name:'tod2',last_name:'Smith2',email:'ts2@gmail.com'})

      .then(res => {
        expect(res.status).toBe(201);
      });
  });
  it('getting 200 and data from clients route', function() {
    return request(server)
      .get('/clients')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject([{first_name:'tod',last_name:'Smith',email:'ts@gmail.com'},{first_name:'tod2',last_name:'Smith2',email:'ts2@gmail.com'}]);

      });
  });

  // this should be a 401 right?
  it ('it should not get since no token', function() {

    return request(server)
      .get('/clients')
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  // ------------------- Get request for one clients for one coach ---------------------- //
  it ('it should get an client', function() {

    return request(server)
      .get('/clients/1')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({first_name:'tod',last_name:'Smith',email:'ts@gmail.com'});
      });
  });
  // this should be a 401 right?
  it ('it should not get since no token', function() {

    return request(server)
      .get('/clients/1')
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not get a client since it does not exist', function() {
    // this should be a 404?
    return request(server)
      .get('/clients/55')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(500);
      });
  });
  // ------------------- Delete Request ---------------------- //
  it ('it should delete a client', function () {
    return request(server)
      .delete('/clients/2')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  // this should be a 401 right?
  it ('it should not delete a client since no token', function () {
    return request(server)
      .delete('/clients/2')
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not delete a client since the client does not exist', function () {
    return request(server)
      .delete('/clients/55')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(404);
      });
  });

  // ------------------- Put Request ---------------------- //
  it ('it should update data to clients db', function() {

    return request(server)
      .put('/clients/1')
      .set('Authorization', token)
      .send({first_name:'jerry',last_name:'Smiths',email:'js@gmail.com'})

      .then(res => {
        expect(res.status).toBe(200);
      });
  });
  it ('it should not update data to clients db since no token', function() {

    return request(server)
      .put('/clients/1')
      .send({first_name:'jerry',last_name:'Smiths',email:'js@gmail.com'})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not update data to clients db since no body', function() {

    return request(server)
      .put('/clients/1')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not update data to clients db since wrong field', function() {

    return request(server)
      .put('/clients/1')
      .set('Authorization', token)
      .send({first_names:'jerry',last_name:'Smiths',email:'js@gmail.com'})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not update data to clients db since it does not exist', function() {

    return request(server)
      .put('/clients/55')
      .set('Authorization', token)
      .send({first_name:'jerry',last_name:'Smiths',email:'js@gmail.com'})
      .then(res => {
        expect(res.status).toBe(404);
      });
  });
});