/* eslint-disable no-undef */
const db = require('../data/db-config');
const Clients = require('./clients-model');
const {seedForTests} = require('../seed_for_tests.spec');

describe('Clients model', () => {
  // beforeAll(async () => {
  //   await db('clients').truncate();
  // });
  beforeAll(seedForTests);
  describe('add client', () => {
    it('add a client into the db', async () => {
      let clientArray;
      clientArray = await db('clients');
      expect(clientArray).toHaveLength(9);
      await Clients.addClient({first_name:'client', last_name:'dude',email: 'client@mail.com',coach_id: 1});
      clientArray = await db('clients');

      expect(clientArray).toHaveLength(10);

    });
  });
  describe('find client by id', () => {
    it('find client by id', async () => {
      let clientObtained = await Clients.getClientById(1);
      expect(clientObtained.email).toBe('clienta@mail.com');

      expect(clientObtained.first_name).toBe('clientFirstA');
    });
  });
  describe('find all clients for that coach', () => {
    it('find all clients for that coach', async () => {
      await Clients.addClient({first_name:'client2', last_name:'dude2',email: 'client2@mail.com',coach_id: 1});
      let clientObtained = await Clients.getClients(1);

      expect(clientObtained).not.toBe(undefined);
    });
  });

  describe('delete client', () => {
    it('delete a client into the db', async () => {
      let clientArray;
      clientArray = await db('clients');
      expect(clientArray).toHaveLength(11);
      await Clients.deleteClient(2);
      clientArray = await db('clients');
      expect(clientArray).toHaveLength(10);
    });
  });

  describe('update client', () => {
    it('update a client into the db', async () => {
      let clientArray;
      clientArray = await db('clients');

      await Clients.updateClient(3, {first_name:'joe', last_name:'bob',email: 'joebob@mail.com',coach_id: 1});
      clientArray = await Clients.getClientById(3);

      expect(clientArray.first_name).toBe('joe');

    });
  });

});