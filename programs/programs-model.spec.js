/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-undef */
const db = require('../data/db-config');
const Programs = require('./programs-model');
const {seedForTests} = require('../seed_for_tests.spec');
let newProgramID;


describe('programs models tests', ()=>{
  beforeAll( async ()=> {
    await seedForTests();
  });

  test('get programs by coach id', async ()=> {
    const programsArray = await Programs.getPrograms(1);
    expect(programsArray).toEqual([
      {
        id: 2,
        name: 'progB',
        phase: 'progB phase',
        description: 'progB desc',
        length: 6,
        coach_id: 1
      }
    ]);
  });

  test('get programs by id', async ()=> {
    const programsArray = await Programs.getProgramById(1);
    expect(programsArray).toEqual(
      {
        id: 1,
        name: 'progA',
        phase: 'progA phase',
        description: 'progA desc',
        length: 5,
        coach_id: 2
      }
    );
  });

  test('add a program', async ()=>{
    const newProgram = {name: 'progFromTest', phase:'progFT phase', description:'progFT desc', length: 22, coach_id:1};
    const programsArray = await Programs.addProgram(newProgram);
    newProgramID = programsArray.id;
    expect(programsArray).toEqual(
      {
        id: 3,
        name: 'progFromTest',
        phase: 'progFT phase',
        description: 'progFT desc',
        length: 22,
        coach_id: 1
      }
    );
  });

  test('update a program', async()=>{
    const updatedProgram = {name: 'progFromTest-new', phase:'progFT phaseNew', description:'progFT descNew', length: 23, coach_id:1};
    const programsArray = await Programs.updateProgram(newProgramID,updatedProgram);
    // console.log('this is in programs',programsArray);
    expect(programsArray).toEqual(
      {
        id: 3,
        name: 'progFromTest-new',
        phase: 'progFT phaseNew',
        description: 'progFT descNew',
        length: 23,
        coach_id: 1
      }
    );
  });



  test('delete a program', async ()=>{
    const programsArray = await Programs.deleteProgram(newProgramID);
    expect(programsArray).toEqual(
      {
        id: 3,
        name: 'progFromTest-new',
        phase: 'progFT phaseNew',
        description: 'progFT descNew',
        length: 23,
        coach_id: 1
      }
    );
  });

});