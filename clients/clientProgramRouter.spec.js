/* eslint-disable no-undef */

const request = require('supertest');
const server = require('../api/server');
const {seedForTests} = require('../seed-for-tests.spec');

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
        token = res.body.token;
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

  //   // seeding a 2nd client
  //   it('it should add another client for get all', function() {
  //     return request(server)
  //       .post('/clients')
  //       .set('Authorization', token)
  //       .send({first_name:'tod2',last_name:'Smith2',email:'ts2@gmail.com'})

  //       .then(res => {
  //         expect(res.status).toBe(201);
  //       });
  //   });
  //   it('getting 200 and data from clients route', function() {
  //     return request(server)
  //       .get('/clients')
  //       .set('Authorization', token)
  //       .then(res => {
  //         expect(res.status).toBe(200);
  //         expect(res.body).toMatchObject([{first_name:'tod',last_name:'Smith',email:'ts@gmail.com'},{first_name:'tod2',last_name:'Smith2',email:'ts2@gmail.com'}]);

  //       });
  //   });

  //   it ('it should not get since no token', function() {

  //     return request(server)
  //       .get('/clients')
  //       .then(res => {
  //         expect(res.status).toBe(400);
  //       });
  //   });

  //   // ------------------- Delete Request ---------------------- //

  //   it ('it should delete a client', function () {
  //     return request(server)
  //       .delete('/clients/3')
  //       .set('Authorization', token)
  //       .then(res => {
  //         expect(res.status).toBe(200);
  //       });
  //   });

  //   it ('it should not delete a client since no token', function () {
  //     return request(server)
  //       .delete('/clients/2')
  //       .then(res => {
  //         expect(res.status).toBe(400);
  //       });
  //   });

  //   it ('it should not delete a client since the client does not exist', function () {
  //     return request(server)
  //       .delete('/clients/55')
  //       .set('Authorization', token)
  //       .then(res => {
  //         expect(res.status).toBe(404);
  //       });
  //   });

  //   it ('it should not delete an exercise since no access', function () {
  //     return request(server)
  //       .delete('/clients/1')
  //       .set('Authorization', token)
  //       .then(res => {
  //         expect(res.status).toBe(403);
  //       });
  //   });

});