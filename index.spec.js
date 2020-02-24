/* eslint-disable no-undef */
/* eslint-disable no-multiple-empty-lines */
const {serverSpecTest} = require('./api/server.spec');
const {authRouterSpecTest} = require('./auth/authRouter.spec');
const {clientProgramRouterSpecTest} = require('./clients/clientProgramRouter.spec');
const {clientModelSpecTest} = require('./clients/clients-model.spec');
const {clientsRouterSpecTest} = require('./clients/clientsRouter.spec');
const {coachesModelSpecTest} = require('./coaches/coaches-model.spec');
const {PassportSetupSpecTest} = require('./config/passport-setup.spec');
const {ExercisesModelSpecTest} = require('./exercises/exercises-model.spec');
const {ExerciseRouterSpecTest} = require('./exercises/exercisesRouter.spec');
const {ProgramsModelSpecTest} = require('./programs/programs-model.spec');
const {ProgramsRouterSpecTest} = require('./programs/programsRouter.spec');
const {WorkoutsModelSpecTest} = require('./workouts/workouts-model.spec');


// Run the tests in this order
serverSpecTest();
authRouterSpecTest();
clientProgramRouterSpecTest();
clientModelSpecTest();
clientsRouterSpecTest();
coachesModelSpecTest();
PassportSetupSpecTest();
ExercisesModelSpecTest();
ExerciseRouterSpecTest();
ProgramsModelSpecTest();
ProgramsRouterSpecTest();

//The last test must have an afterAll that destroys the knex connection
// to prevent jest from not terminating properly
WorkoutsModelSpecTest();



test('dummy',()=>{
  let dummy = true;
  expect(dummy).toBe(true);
});



// const {} = require('.');