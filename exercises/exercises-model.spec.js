/* eslint-disable no-undef */
const db = require('../data/db-config');
const Exercises = require('./exercises-model');
const {seedForTests} = require('../seed_for_tests.spec');
describe('exercises model', () => {
  // beforeAll(async () => {
  //   await db('exercises').truncate();
  // });
  beforeAll(seedForTests);
  describe('add exercise', () => {
    it('add a exercise into the db', async () => {
      let exerciseArray;
      exerciseArray = await db('exercises');
      expect(exerciseArray).toHaveLength(7);
      await Exercises.addExercise({name:'pull ups', coach_id: 1});
      exerciseArray = await db('exercises');

      expect(exerciseArray).toHaveLength(8);

    });
  });
  describe('find exercise by id', () => {
    it('find exercise by id', async () => {
      let exerciseObtained = await Exercises.getExerciseById(8);
      expect(exerciseObtained.name).toBe('pull ups');
    });
  });

  describe('find all exercises for that coach', () => {
    it('find all exercises for that coach', async () => {
      await Exercises.addExercise({name:'push ups',coach_id: 1});
      let exerciseObtained = await Exercises.getExercises(1);

      expect(exerciseObtained).not.toBe(undefined);
    });
  });

  describe('delete exercise', () => {
    it('delete a exercise into the db', async () => {
      let exerciseArray;
      exerciseArray = await db('exercises');
      expect(exerciseArray).toHaveLength(9);
      await Exercises.deleteExercise(2);
      exerciseArray = await db('exercises');
      expect(exerciseArray).toHaveLength(8);
    });
  });

  describe('update exercise', () => {
    it('update a exercise into the db', async () => {
      let exerciseArray;
      exerciseArray = await db('exercises');

      await Exercises.updateExercise(1, {name:'sit ups',coach_id: 1});
      exerciseArray = await Exercises.getExerciseById(1);
      console.log(exerciseArray);
      expect(exerciseArray.name).toBe('sit ups');

    });
  });

});