/* eslint-disable no-undef */
const db = require('../data/db-config');
const request = require('supertest');
const server = require('../api/server');
const {seedForTests} = require('../seed_for_tests.spec');

let token ;
let token2;

// ------------------- CLEARING DATABASE and Registering Account---------------------- //
describe('clientsRouter', function() {

  beforeAll(seedForTests);

  beforeAll(async() => {

    await request(server)
      .post('/auth/register')
      .send({ first_name: 'Hello2', last_name: 'World2', email: 'helloworld2@email.com', password: 'pass' })
      .then(res => {
        expect(res.status).toBe(201);
        token = `Bearer ${res.body.token}`;
      });
    await request(server)
      .post('/auth/register')
      .send({ first_name: 'HelloClients', last_name: 'HelloClients', email: 'helloworldClients@email.com', password: 'pas2s' })
      .then(res => {
        expect(res.status).toBe(201);
        token2 = `Bearer ${res.body.token}`;
      });
    await request(server)
      .post('/clients')
      .set('Authorization', token2)
      .send({first_name:'terry',last_name:'yodo',email:'ty@gmail.com'})
      .then(res => {
        expect(res.status).toBe(201);
      });

  });
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
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

  // // seeding a 2nd client
  // it('it should add another client for get all', function() {
  //   return request(server)
  //     .post('/clients')
  //     .set('Authorization', token)
  //     .send({first_name:'tod2',last_name:'Smith2',email:'ts2@gmail.com'})

  //     .then(res => {
  //       expect(res.status).toBe(201);
  //     });
  // });
  it('getting 200 and data from clients route', function() {
    return request(server)
      .get('/clients')
      .set('Authorization', token)
      .then(res => {
        console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body).not.toBe(undefined);

      });
  });

  it ('it should not get since no token', function() {

    return request(server)
      .get('/clients')
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  // ------------------- Get request for one clients for one coach ---------------------- //
  it ('it should get a client', function() {

    return request(server)
      .get('/clients/11')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({first_name:'tod',last_name:'Smith',email:'ts@gmail.com'});
      });
  });

  it ('it should not get since no token', function() {

    return request(server)
      .get('/clients/1')
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not get a client since it does not exist', function() {

    return request(server)
      .get('/clients/55')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(404);
      });
  });

  it ('it should not get an exercise since you do not have access', function() {

    return request(server)
      .get('/clients/1')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(403);
      });
  });

  // ------------------- Put Request ---------------------- //
  it ('it should update data to clients db', function() {

    return request(server)
      .put('/clients/11')
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

  it ('it should not update data to exercises db since no access', function() {

    return request(server)
      .put('/clients/1')
      .set('Authorization', token)
      .send({first_name:'jerry',last_name:'Smiths',email:'js@gmail.com'})
      .then(res => {
        expect(res.status).toBe(403);
      });
  });
  // ------------------- Delete Request ---------------------- //
  it ('it should delete a client', function () {
    return request(server)
      .delete('/clients/11')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

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
  it ('it should not delete an exercise since no access', function () {
    return request(server)
      .delete('/clients/1')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(403);
      });
  });
});