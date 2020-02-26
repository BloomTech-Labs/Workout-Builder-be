/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-undef */
const db = require('../data/db-config');
const request = require('supertest');
const server = require('../api/server');
const {seedForTests} = require('../seed_for_tests.spec');
let token;

describe('programs router tests', ()=>{
  beforeAll( async ()=> {
    await seedForTests();
  });



  test('login a coach to get a token', async ()=>{
    const res = await request(server).post('/auth/login').send({ email: 'as@mail.com', password: 'qaz' });
    expect(res.status).toBe(200);
    token = `Bearer ${res.body.token}`;
  });


  test('get programs by coach id', async ()=>{
    const res = await request(server).get('/programs').set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        'id': 2,
        'name': 'progB',
        'phase': 'progB phase',
        'description': 'progB desc',
        'length': 6,
        'coach_id': 1,
        'workouts': [
          {
            'id': 1,
            'name': 'workA',
            'description': 'workA desc',
            'day': 1,
            'exercises': [
              {
                'exercise_id': 4,
                'order': 1,
                'exercise_details': 'ex details1'
              },
              {
                'exercise_id': 3,
                'order': 2,
                'exercise_details': 'ex details2'
              }
            ]
          },
          {
            'id': 2,
            'name': 'workB',
            'description': 'workB desc',
            'day': 2,
            'exercises': [
              {
                'exercise_id': 1,
                'order': 1,
                'exercise_details': 'ex details3'
              },
              {
                'exercise_id': 2,
                'order': 2,
                'exercise_details': 'ex details4',
              }
            ]
          }
        ],
        'assigned_clients': [
          3,
          1,
          2
        ]
      }
    ]);
  });


  test('post a program', async ()=>{
    const res = await request(server).post('/programs').set('Authorization', token)
      .send({
        'name': 'progC',
        'description': 'progC desc',
        'length': 7,
        'phase': 'progC phase',
        'workouts': [
          {
            'name': 'work1',
            'description': 'work1 desc',
            'day': 1,
            'exercises': [
              {'exercise_id': 1, 'order':1, 'exercise_details': 'exD1_work1'},
              {'exercise_id': 2, 'order':2, 'exercise_details': 'exD2_work1'},
              {'exercise_id': 3, 'order':3, 'exercise_details': 'exD3_work1'}
            ]
          },

          {
            'name': 'work2',
            'description': 'work2 desc',
            'day': 2,
            'exercises': [
              {'exercise_id': 4, 'order':1, 'exercise_details': 'exD4_work2'},
              {'exercise_id': 1, 'order':2, 'exercise_details': 'exD1_work2'},
              {'exercise_id': 2, 'order':3, 'exercise_details': 'exD2_work2'}
            ]
          },

          {
            'name': 'work3',
            'description': 'work3 desc',
            'day': 3,
            'exercises': [
              {'exercise_id': 3, 'order':1, 'exercise_details': 'exD3_work3'},
              {'exercise_id': 1, 'order':2, 'exercise_details': 'exD1_work3'}
            ]
          }
        ]
      });
    expect(res.status).toBe(201);
    // console.log('This is point 2 res.body:',JSON.stringify(res.body, undefined, 2));
    expect(res.body).toEqual([
      {
        'id': 2,
        'name': 'progB',
        'phase': 'progB phase',
        'description': 'progB desc',
        'length': 6,
        'coach_id': 1,
        'workouts': [
          {
            'id': 1,
            'name': 'workA',
            'description': 'workA desc',
            'day': 1,
            'exercises': [
              {
                'exercise_id': 4,
                'order': 1,
                'exercise_details': 'ex details1'
              },
              {
                'exercise_id': 3,
                'order': 2,
                'exercise_details': 'ex details2'
              }
            ]
          },
          {
            'id': 2,
            'name': 'workB',
            'description': 'workB desc',
            'day': 2,
            'exercises': [
              {
                'exercise_id': 1,
                'order': 1,
                'exercise_details': 'ex details3'
              },
              {
                'exercise_id': 2,
                'order': 2,
                'exercise_details': 'ex details4'
              }
            ]
          }
        ],
        'assigned_clients': [
          3,
          1,
          2
        ]
      },
      {
        'id': 3,
        'name': 'progC',
        'phase': 'progC phase',
        'description': 'progC desc',
        'length': 7,
        'coach_id': 1,
        'workouts': [
          {
            'id': 5,
            'name': 'work1',
            'description': 'work1 desc',
            'day': 1,
            'exercises': [
              {
                'exercise_id': 1,
                'order': 1,
                'exercise_details': 'exD1_work1'
              },
              {
                'exercise_id': 2,
                'order': 2,
                'exercise_details': 'exD2_work1'
              },
              {
                'exercise_id': 3,
                'order': 3,
                'exercise_details': 'exD3_work1'
              }
            ]
          },
          {
            'id': 6,
            'name': 'work2',
            'description': 'work2 desc',
            'day': 2,
            'exercises': [
              {
                'exercise_id': 4,
                'order': 1,
                'exercise_details': 'exD4_work2'
              },
              {
                'exercise_id': 1,
                'order': 2,
                'exercise_details': 'exD1_work2'
              },
              {
                'exercise_id': 2,
                'order': 3,
                'exercise_details': 'exD2_work2'
              }
            ]
          },
          {
            'id': 7,
            'name': 'work3',
            'description': 'work3 desc',
            'day': 3,
            'exercises': [
              {
                'exercise_id': 3,
                'order': 1,
                'exercise_details': 'exD3_work3'
              },
              {
                'exercise_id': 1,
                'order': 2,
                'exercise_details': 'exD1_work3'
              }
            ]
          }
        ],
        'assigned_clients': []
      }
    ]);
  });

  test('delete a program', async ()=>{
    const res = await request(server).delete('/programs/3').set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      'id': 3,
      'name': 'progC',
      'phase': 'progC phase',
      'description': 'progC desc',
      'length': 7,
      'coach_id': 1
    });
  });





  // console.log('This is point 1 res.body:',res.body);
  // console.log('This is point 2 res.body:',JSON.stringify(res.body, undefined, 2));






});











