/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-undef */
const db = require('../data/db-config');
const Workouts = require('./workouts-model');
const {seedForTests} = require('../seed_for_tests.spec');

describe('workouts model', ()=>{
  beforeAll( async ()=>{
    await seedForTests();
  });


  test('get exercise_workout record by workout id', async ()=>{
    const receivedData = await Workouts.getExercisesByWorkoutId(1);
    expect(receivedData).toEqual([
      { exercise_id: 4, order: 1, exercise_details: 'ex details1' },
      { exercise_id: 3, order: 2, exercise_details: 'ex details2' }
    ]);

  });


  test('delete exercise_workout record by exercise id & workout_id', async ()=>{
    const receivedData = await Workouts.deleteExerciseInWorkout([{exercise_id:6,workout_id:4}]);
    expect(receivedData).toEqual(1);

  });




});
