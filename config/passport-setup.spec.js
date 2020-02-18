/* eslint-disable no-undef */
const db = require('../data/db-config');
const Coaches = require('../coaches/coaches-model');
const googleStrt = require('./passport-setup');

describe ('test google strategy function', () => {
  beforeAll(async () => {
    await db('coaches').truncate();
  });

  describe('New google login will add in a new coach', () => {
    it('a new google login', async () => {

      const usersMockA = {
        name: {givenName:'HelloNew', familyName:'WorldNew'},
        _json: {email:'testGoog@mail.com'}
      };

      let coachesObj = await
      new Promise(function(resolve) {
        function doneMock(a,b) {
          resolve(b);
        }
        googleStrt(null,null,usersMockA,doneMock);
      });

      expect(coachesObj.first_name).toBe('HelloNew');
      expect(coachesObj.last_name).toBe('WorldNew');

    });
  });

  describe('Put in a new coach for the next test', () => {
    it('add a new coach', async ()=> {
      await Coaches.addCoach({
        email: 'abc@def.com',
        password:'1234',
        first_name: 'Sunny',
        last_name: 'Day'
      });
    });
  });

  describe('Subsequent google login will find previously added coach', () => {
    it('a repeat google login', async () => {

      const usersMockB = {
        _json: {email:'abc@def.com'}
      };

      let coachesObj = await
      new Promise(function(resolve) {
        function doneMock(a,b) {
          resolve(b);
        }
        googleStrt(null,null,usersMockB,doneMock);
      });

      expect(coachesObj.first_name).toBe('Sunny');
      expect(coachesObj.last_name).toBe('Day');
      expect(coachesObj.password).toBe('1234');

    });
  });

});