const jwt = require('jsonwebtoken');

module.exports = {
  validBodyCheck,
  validTokenCheck,
  validCoachIdCheck,
  validRecordIdCoachIdCheck
};

const {jwtSecret} = require('../consts');
const db = require('../data/db-config');

// ********************************************************
// validBodyCheck
// This checks the body when it is one object
// The propts is an array of properties that the object should
// contain
// ********************************************************
function validBodyCheck(propts) {
  return function (req,res,next) {
    const body = req.body;
    let isError = false;
    let errMsg = '';

    if(Object.keys(body).length === 0) {
      isError = true;
      errMsg = 'missing request body';
    }
    else if(!isError) {
      propts.forEach(elem=>{
        if(!body[elem]) {
          isError = true;
          errMsg = `missing field ${elem} in request body`;
        }
      });
    }

    if(isError) {
      res.status(400).json({ message: errMsg });
    }
    else {
      next();
    }
  };
}

// ********************************************************
// validTokenCheck
// ********************************************************
function validTokenCheck(req, res, next) {
  const { authorization } = req.headers;

  if (authorization) {

    jwt.verify(authorization, jwtSecret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ message: 'Invalid Token' });
      } else {

        req.token = decodedToken;

        next();
      }
    });
  } else {
    res.status(400).json({ message: 'Please login first' });
  }
}

// ********************************************************
// validCoachIdCheck
// ********************************************************
async function validCoachIdCheck(coach_id, table_name, id) {
  let returnObject = {validCoachId: false, idExists: false};
  let tempObject = await db(table_name).where({ id }).first();
  if (tempObject && coach_id === tempObject.coach_id) {
    returnObject.validCoachId = true;
    returnObject.idExists = true;
  } else if (tempObject && coach_id !== tempObject.coach_id) {
    returnObject.validCoachId = false;
    returnObject.idExists = true;
  }
  return returnObject;
}

// *******************************************************************
// validRecordIdCoachIdCheck
// The arg ids is an array of ids of records from one table in the database.
// The arg table_name is a string specifying the table in the database.
// The arg coach_id must be part of a record in the table specified by table_name. That
// is you cannot make table_name a table that does not have coach_id as part of the
// record of the table
//
// This function returns the object with keys validCoachId, idExists, badCId, badId
//
// The key validCoachId is a boolean that will be true if the coach_id is asscociated
// with ALL the records in table_name that have ids that are in the arg ids.
// If validCoachId is false then badCId will be the value of an element in arg ids that
// is part of a record in table_names, but that this reçord does not contain the
// coach_id arg. If validCoachId is true then badCId is 0
//
// The idExists is a boolean that will be true if all the elements of the arg id
// are associated with records in table_name.
// If idExists is false then badId will be the value of an element in arg id that is
// not part of a record in table_name. If idExists is true then badId will be 0.
//
// This function reports on the first failure, so not all elements in arg id may be checked
// if more than 1 element in arg id can make validCoachId or idExists false
// Also idExists is checked before validCoachId
// ********************************************************
async function validRecordIdCoachIdCheck(coach_id, table_name, ids) {
  let returnObject = {validCoachId: true, idExists: true, badCId:0, badId:0};
  for(let i=0;i<ids.length;i++) {
    const id = ids[i];
    const tempObject = await db(table_name).where({ id }).first();
    if (!tempObject) {
      returnObject.idExists = false;
      returnObject.badId = id;
      return returnObject;
    }
    else if(coach_id !== tempObject.coach_id) {
      returnObject.validCoachId = false;
      returnObject.badCId = id;
      return returnObject;
    }
  }
  return returnObject;
}