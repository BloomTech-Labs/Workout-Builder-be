/* eslint-disable no-undef */

const request = require('supertest');
const server = require('../api/server');
const {seedForTests} = require('../seed_for_tests.spec');

let token;

// ------------------- CLEARING DATABASE and Registering Account---------------------- //
describe('clientProgramRouter', function() {
  beforeAll(seedForTests);

  // ------------------- Post request ---------------------- //

  it ('should login', function() {

    //Login to receive token
    return request(server)
      .post('/auth/login')
      .send({ email: 'as@mail.com', password: 'qaz' })
      .then(res => {
        expect(res.status).toBe(200);
        token = `Bearer ${res.body.token}`;
        console.log('token', token);
      });

  });

  it ('should add data to clients_programs db', function() {

    return request(server)
      .post('/clients-programs')
      .set('Authorization', token)
      .send({program_id: 2, client_ids: [7, 8, 9]})

      .then(res => {
        expect(res.status).toBe(201);
      });

  });

  it ('should not post since no token', function() {

    return request(server)
      .post('/clients-programs')
      .send({program_id: 2, client_ids: [7, 8, 9]})

      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  it ('should not add data to db because no body', function() {

    return request(server)
      .post('/clients-programs')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  it ('should not add data to db because client_id is the wrong field', function() {

    return request(server)
      .post('/clients-programs')
      .set('Authorization', token)
      .send({program_id: 2, client_id: [7, 8, 9]})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  it ('it should not add data to db because the clients provided do not belong to that coach', function() {

    return request(server)
      .post('/clients-programs')
      .set('Authorization', token)
      .send({program_id: 2, client_ids: [6, 4, 5]})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  it ('it should not add data to db because the program provided does not belong to that coach', function() {

    return request(server)
      .post('/clients-programs')
      .set('Authorization', token)
      .send({program_id: 1, client_ids: [7, 8, 9]})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  // ------------------- Get request for all clients for one coach ---------------------- //

  it('should get dashboard info', function() {
    return request(server)
      .get('/clients-programs/dashboard')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body[0].name).toBe('progB');
        expect(res.body[5].first_name).toBe('clientFirstI');
      });
  });

  it ('should not get any data since no token', function() {
    return request(server)
      .get('/clients-programs/dashboard')
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  // ------------------- Delete Request ---------------------- //

  it ('it should delete a client from a program or vice versa', function () {
    return request(server)
      .delete('/clients-programs')
      .set('Authorization', token)
      .send({program_id: 2, client_id: 9})
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  it ('it should not delete a client from a program since no token', function () {
    return request(server)
      .delete('/clients-programs')
      .send({program_id: 2, client_id: 9})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  it ('it should not delete a client from a program since the client does not exist', function () {
    return request(server)
      .delete('/clients-programs')
      .set('Authorization', token)
      .send({program_id: 2, client_id: 17})
      .then(res => {
        expect(res.status).toBe(404);
      });
  });

  it ('it should not delete a client from a program since the program does not exist', function () {
    return request(server)
      .delete('/clients-programs')
      .set('Authorization', token)
      .send({program_id: 5, client_id: 9})
      .then(res => {
        expect(res.status).toBe(404);
      });
  });

  it ('it should not delete a client from a program since you do not have access', function () {
    return request(server)
      .delete('/clients-programs')
      .set('Authorization', token)
      .send({program_id: 1, client_id: 4})
      .then(res => {
        expect(res.status).toBe(403);
      });
  });

});