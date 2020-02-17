
exports.seed = function(knex) {
  return knex('exercises_workouts')
    .truncate()
    .then(function () {
      return knex('exercises_workouts').insert([
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
    });
};