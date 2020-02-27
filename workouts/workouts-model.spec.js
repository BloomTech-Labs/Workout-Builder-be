/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-undef */
const db = require('../data/db-config');
const Workouts = require('./workouts-model');
const {seedForTests} = require('../seed_for_tests.spec');

describe('workouts model', () => {
  beforeAll( async ()=>{
    await seedForTests();
  });

  describe('add workout', () => {
    it('add a workout into the db', async () => {
      let workoutArray;
      workoutArray = await db('workouts');
      expect(workoutArray).toHaveLength(4);
      await Workouts.addWorkout({name:'chest and back', description:'lots of push ups and pull ups',day: 1,coach_id: 1, program_id:1});
      workoutArray = await db('workouts');

      expect(workoutArray).toHaveLength(5);

    });
  });
  describe('find workouts by id', () => {
    it('find workouts by id', async () => {
      let workoutArray = await Workouts.getWorkoutById([5]);

      expect(workoutArray).toMatchObject([{ id: 5,
        name: 'chest and back',
        description: 'lots of push ups and pull ups',
        day: 1,
        coach_id: 1,
        program_id: 1 }]);
    });
  });
  describe('find all workouts for that coach', () => {
    it('find all workouts for that coach', async () => {

      let workoutsObtained = await Workouts.getWorkouts(1);

      expect(workoutsObtained).not.toBe(undefined);
    });
  });
  describe('find all workouts for that Program ID', () => {
    it('find all workouts for that Program ID', async () => {

      let workoutsObtained = await Workouts.getWorkoutByProgramId(1);

      expect(workoutsObtained).not.toBe(undefined);
    });
  });
  describe('update workout', () => {
    it('update a workout into the db', async () => {
      let workoutsObtained;

      await Workouts.updateWorkout(5, {name:'Yoga', description:'lots of yoga stuff',day: 1,coach_id: 1, program_id:1});
      workoutsObtained = await Workouts.getWorkoutById([5]);

      expect(workoutsObtained).toMatchObject([{ id: 5,
        name: 'Yoga',
        description: 'lots of yoga stuff',
        day: 1,
        coach_id: 1,
        program_id: 1 }]);

    });
  });
  describe('delete workout', () => {
    it('delete a workouts into the db', async () => {
      let workoutsArray;
      workoutsArray = await db('workouts');
      expect(workoutsArray).toHaveLength(5);
      await Workouts.deleteWorkout(5);
      workoutsArray = await db('workouts');
      expect(workoutsArray).toHaveLength(4);
    });
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