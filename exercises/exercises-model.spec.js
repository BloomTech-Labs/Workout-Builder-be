/* eslint-disable no-undef */
const db = require('../data/db-config');
const Exercises = require('./exercises-model');

describe('exercises model', () => {
  beforeAll(async () => {
    await db('exercises').truncate();
  });

  describe('add exercise', () => {
    it('add a exercise into the db', async () => {
      let exerciseArray;
      exerciseArray = await db('exercises');
      expect(exerciseArray).toHaveLength(0);
      await Exercises.addExercise({name:'pull ups', coach_id: 1});
      exerciseArray = await db('exercises');

      expect(exerciseArray).toHaveLength(1);

    });
  });
  describe('find exercise by id', () => {
    it('find exercise by id', async () => {
      let exerciseObtained = await Exercises.getExerciseById(1);
      expect(exerciseObtained.name).toBe('pull ups');
    });
  });

  describe('find all exercises for that coach', () => {
    it('find all exercises for that coach', async () => {
      await Exercises.addExercise({name:'push ups',coach_id: 1});
      let exerciseObtained = await Exercises.getExercises(1);

      expect(exerciseObtained).toMatchObject([{name:'pull ups',coach_id: 1},{name:'push ups', coach_id: 1}]);
    });
  });

  describe('delete exercise', () => {
    it('delete a exercise into the db', async () => {
      let exerciseArray;
      exerciseArray = await db('exercises');
      expect(exerciseArray).toHaveLength(2);
      await Exercises.deleteExercise(2);
      exerciseArray = await db('exercises');
      expect(exerciseArray).toHaveLength(1);
    });
  });

  describe('update exercise', () => {
    it('update a exercise into the db', async () => {
      let exerciseArray;
      exerciseArray = await db('exercises');

      await Exercises.updateExercise(1, {name:'sit ups',coach_id: 1});
      exerciseArray = await db('exercises');

      expect(exerciseArray).toMatchObject([{name:'sit ups' ,coach_id: 1}]);

    });
  });

});