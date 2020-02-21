/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-undef */
const db = require('./data/db-config');
const bcrypt = require('bcryptjs');
const {hashRounds} = require('./consts');

module.exports = {
  seedForTests
};

//This function should be run the first thing in a test file to
//seed the database
async function seedForTests() {

  //Seed the coaches table
  await db('coaches').truncate();
  await db('coaches').insert([
    {first_name: 'Arnold', last_name:'Swas', email:'as@mail.com', password: bcrypt.hashSync('qaz', hashRounds)},
    {first_name: 'Charles', last_name:'Johnson', email:'cj@mail.com', password: bcrypt.hashSync('qaz', hashRounds)}
  ]);

  //Seed the exercises table
  await db('exercises').truncate();
  await db('exercises').insert([
    {name: 'exerA', focal_points:'ex textA', coach_id:1},
    {name: 'exerB', focal_points:'ex textB', coach_id:1},
    {name: 'exerC', focal_points:'ex textC', coach_id:1},
    {name: 'exerD', focal_points:'ex textD', coach_id:1},
    {name: 'exerE', focal_points:'ex textE', coach_id:2},
    {name: 'exerF', focal_points:'ex textF', coach_id:2},
    {name: 'exerG', focal_points:'ex textG', coach_id:2}
  ]);

  //Seed the programs table
  await db('programs').truncate();
  await db('programs').insert([
    {name: 'progA', description:'progA desc', length: 5, phase: 'progA phase', coach_id:2},
    {name: 'progB', description:'progB desc', length: 6, phase: 'progB phase', coach_id:1}
  ]);

  //Seed the workouts table
  await db('workouts').truncate();
  await db('workouts').insert([
    {name: 'workA', description:'workA desc', day: 1, coach_id:1, program_id: 2},
    {name: 'workB', description:'workB desc', day: 2, coach_id:1, program_id: 2},
    {name: 'workC', description:'workC desc', day: 1, coach_id:2, program_id: 1},
    {name: 'workD', description:'workD desc', day: 2, coach_id:2, program_id: 1}
  ]);

  //Seed the exercises_workouts table
  await db('exercises_workouts').truncate();
  await db('exercises_workouts').insert([
    //For coach_id =1
    {exercise_id:4, workout_id:1, order:1, exercise_details:'ex details1'},
    {exercise_id:3, workout_id:1, order:2, exercise_details:'ex details2'},
    {exercise_id:1, workout_id:2, order:1, exercise_details:'ex details3'},
    {exercise_id:2, workout_id:2, order:2, exercise_details:'ex details4'},

    //For coach_id = 2
    {exercise_id:5, workout_id:3, order:1, exercise_details:'ex details5'},
    {exercise_id:7, workout_id:4, order:1, exercise_details:'ex details6'},
    {exercise_id:6, workout_id:4, order:2, exercise_details:'ex details7'}
  ]);

  //Seed the clients table
  await db('clients').truncate();
  await db('clients').insert([
    {first_name: 'clientFirstA', last_name: 'clientLastA', email: 'clienta@mail.com', coach_id: 1,},
    {first_name: 'clientFirstB', last_name: 'clientLastB', email: 'clientb@mail.com', coach_id: 1,},
    {first_name: 'clientFirstC', last_name: 'clientLastC', email: 'clientc@mail.com', coach_id: 1,},
    {first_name: 'clientFirstD', last_name: 'clientLastD', email: 'clientd@mail.com', coach_id: 2,},
    {first_name: 'clientFirstE', last_name: 'clientLastE', email: 'cliente@mail.com', coach_id: 2,},
    {first_name: 'clientFirstF', last_name: 'clientLastF', email: 'clientf@mail.com', coach_id: 2,},
    {first_name: 'clientFirstG', last_name: 'clientLastG', email: 'clientg@mail.com', coach_id: 1,},
    {first_name: 'clientFirstH', last_name: 'clientLastH', email: 'clienth@mail.com', coach_id: 1,},
    {first_name: 'clientFirstI', last_name: 'clientLastI', email: 'clienti@mail.com', coach_id: 1,}
  ]);

  //Seed the clients_programs table
  await db('clients_programs').truncate();
  await db('clients_programs').insert([
    //For coach_id =1
    {client_id:3, program_id:2, start_date:'2020-2-10', current_day:1},
    {client_id:1, program_id:2, start_date:'2020-6-15', current_day:4},
    {client_id:2, program_id:2, start_date:'2020-12-05', current_day:7},

    //For coach_id = 2
    {client_id:6, program_id:1, start_date:'2020-3-11', current_day:2},
    {client_id:5, program_id:1, start_date:'2020-4-17', current_day:5},
    {client_id:4, program_id:1, start_date:'2020-11-30', current_day:14}
  ]);

}

test('dummy',()=>{
  let dummy = true;
  expect(dummy).toBe(true);
});




