/* eslint-disable no-undef */
const db = require('../data/db-config');
const request = require('supertest');
const server = require('../api/server');
const {seedForTests} = require('../seed_for_tests.spec');
let token ;
let token2;

// ------------------- CLEARING DATABASE And Registering Account---------------------- //
describe('exercisesRouter', function() {

  beforeAll(seedForTests);

  beforeAll(async() => {

    await request(server)
      .post('/auth/register')
      .send({ first_name: 'Hello3', last_name: 'World3', email: 'helloworld3@email.com', password: 'pass' })
      .then(res => {
        expect(res.status).toBe(201);
        token = `Bearer ${res.body.token}`;
      });
    await request(server)
      .post('/auth/register')
      .send({ first_name: 'HelloExercises', last_name: 'HelloExercises', email: 'helloworldExercises@email.com', password: 'pas2s' })
      .then(res => {
        expect(res.status).toBe(201);
        token2 = `Bearer ${res.body.token}`;
      });
    await request(server)
      .post('/exercises')
      .set('Authorization', token2)
      .send({name:'jumping jacks'})

      .then(res => {
        expect(res.status).toBe(201);
      });

  });
  // afterAll(async () => {
  //   await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  // });
  // afterAll(()=>{
  //   db.destroy();
  // });
  // ------------------- Post request ---------------------- //

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
  // ------------------- Get request for all exercises for one coach ---------------------- //

  // seeding a 2nd workout
  // it('it should add another workout for get all', function() {
  //   return request(server)
  //     .post('/exercises')
  //     .set('Authorization', token)
  //     .send({name:'Burpees2'})

  //     .then(res => {
  //       expect(res.status).toBe(201);
  //     });
  // });
  it('getting 200 and data from exercises route', function() {
    return request(server)
      .get('/exercises')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).not.toBe(undefined);

      });
  });

  it ('it should not get since no token', function() {

    return request(server)
      .get('/exercises')
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  // ------------------- Get request for one exercises for one coach ---------------------- //
  it ('it should get an exercise', function() {

    return request(server)
      .get('/exercises/9')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ 'focal_points': null, 'id': 9, 'name': 'Burpees', 'thumbnail_url': null, 'type': null, 'video_url': null});
      });
  });

  it ('it should not get since no token', function() {

    return request(server)
      .get('/exercises/1')
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not get an exercise since it does not exist', function() {

    return request(server)
      .get('/exercises/55')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(404);
      });
  });
  it ('it should not get an exercise since you do not have access', function() {

    return request(server)
      .get('/exercises/1')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(403);
      });
  });

  // ------------------- Put Request ---------------------- //
  it ('it should update data to exercises db', function() {

    return request(server)
      .put('/exercises/9')
      .set('Authorization', token)
      .send({name:'pushup'})

      .then(res => {
        expect(res.status).toBe(200);
      });
  });
  it ('it should not update data to exercises db since no token', function() {

    return request(server)
      .put('/exercises/1')
      .send({name:'pushup'})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not update data to exercises db since no body', function() {

    return request(server)
      .put('/exercises/1')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not update data to exercises db since wrong field', function() {

    return request(server)
      .put('/exercises/1')
      .set('Authorization', token)
      .send({names:'pushup'})
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not update data to exercises db since it does not exist', function() {

    return request(server)
      .put('/exercises/55')
      .set('Authorization', token)
      .send({name:'pushup'})
      .then(res => {
        expect(res.status).toBe(404);
      });
  });
  it ('it should not update data to exercises db since no access', function() {

    return request(server)
      .put('/exercises/1')
      .set('Authorization', token)
      .send({name:'pushup'})
      .then(res => {
        expect(res.status).toBe(403);
      });
  });

  // ------------------- Delete Request ---------------------- //
  it ('it should delete an exercise', function () {
    return request(server)
      .delete('/exercises/9')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  it ('it should not delete an exercise since no token', function () {
    return request(server)
      .delete('/exercises/2')
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
  it ('it should not delete an exercise since the exercise does not exist', function () {
    return request(server)
      .delete('/exercises/55')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(404);
      });
  });
  it ('it should not delete an exercise since no access', function () {
    return request(server)
      .delete('/exercises/1')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(403);
      });
  });

});