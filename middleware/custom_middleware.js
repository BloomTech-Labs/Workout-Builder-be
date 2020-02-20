/* eslint-disable no-multiple-empty-lines */
const jwt = require('jsonwebtoken');

module.exports = {
  validBodyCheck,
  validTokenCheck,
  objectKeyCheck,
  arrayObjectKeyCheck,
  engineValidBdyChk,
  validRecordIdCoachIdCheck
};

const {jwtSecret} = require('../consts');
const db = require('../data/db-config');

// ********************************************************
// This is not used. New version below
//
// validBodyCheck
// This checks the body when it is one object
// The propts is an array of properties that the object should
// contain
// ********************************************************
// function validBodyCheck(propts) {
//   return function (req,res,next) {
//     const body = req.body;
//     let isError = false;
//     let errMsg = '';

//     if(Object.keys(body).length === 0) {
//       isError = true;
//       errMsg = 'missing request body';
//     }
//     else if(!isError) {
//       propts.forEach(elem=>{
//         if(!body[elem]) {
//           isError = true;
//           errMsg = `missing field ${elem} in request body`;
//         }
//       });
//     }

//     if(isError) {
//       res.status(400).json({ message: errMsg });
//     }
//     else {
//       next();
//     }
//   };
// }

// ********************************************************
// validBodyCheck
// This checks the body when it is one object
// The arg keys is an array of keys that the object should
// contain
// The actual checking takes place in the function
// engineValidBdyChk that is defined below
// ********************************************************
function validBodyCheck(keys) {
  return function (req,res,next) {
    const body = req.body;
    const rcdObj = engineValidBdyChk(body,keys);
    if(rcdObj.isError) {
      res.status(400).json({ error: rcdObj.errMsg });
    }
    else {
      next();
    }
  };
}

// ********************************************************
// engineValidBC
// This function checks that the arg objChk, which is an object, is
// not undefined and has the keys in arg keys
//
// The returned object has the keys isError which is a boolean
// and errMsg which is a string
// If isError is false then errMsg is an empty string
// If isError is true then the errMsg is a string containing an
// error message
// ********************************************************
function engineValidBdyChk(objChk,keys) {
  const retObj = {isError:false, errMsg: ''};
  if(Object.keys(objChk).length === 0) {
    retObj.isError = true;
    retObj.errMsg = 'missing request body';
    return retObj;
  }
  const rcdObj = objectKeyCheck(keys,objChk);
  if(!rcdObj.containsAll) {
    retObj.isError = true;
    retObj.errMsg = `missing key ${rcdObj.missingKey} in request body`;
    return retObj;
  }
  return retObj;
}

// **************************************************************************
// objectKeyCheck
// This checks for keys in an object.
// The arg keysToCheck is an array of keys that the arg objChecked should
// contain.
// The object returnedObject is returned by the function and has the
// keys containsAll & missingKey
//
// If ALL of the elements in the arg keysToCheck are keys in the arg objChecked
// then the boolean containsAll is true, otherwise it is false
// If containsAll is true then missingKey is undefined
// If containsAll is false then missingKey is the first element in the arg keysToCheck
// that is not found as a key in the arg objChecked.
//
// If there is more than one missing keys, this function terminates after the first
// missing key is found
// **************************************************************************
function objectKeyCheck(keysToCheck,objChecked) {
  const returnedObject = { containsAll:true, missingKey:undefined };
  const aryLength = keysToCheck.length;
  for(let i=0;i<aryLength;i++) {
    const elem = keysToCheck[i];
    if(!objChecked[elem]) {
      returnedObject.containsAll = false;
      returnedObject.missingKey = elem;
      return returnedObject;
    }
  }
  return returnedObject;
}

// **************************************************************************
// arrayObjectKeyCheck
// This checks for keys in an array of objects, where each object should have the
// same keys.
// The arg keysToCheck is an array of keys that should be in each object in the
// arg arrayObjChecked
// The object returnedObject is returned by the function and has the
// keys containsAll, missingKey and indexValue
//
// If ALL the elements in the arg keysTOCheck are keys in ALL of the objects in
// the arg arrayObjChecked, then the boolean containsAll is true, otherwise
// it is false
// If containsAll is true then missingKey is undefined & indexValue is -1
// If containsAll is false then missingKey is the first element in the arg keysToCheck
// that is not found as a key in the first element of arg objChecked. The indexValue
// will be the index of this first element
//
// If there is more than one missing keys, in more than one of the objects, this
// function terminates after the first missing key is found
// **************************************************************************
function arrayObjectKeyCheck(keysToCheck,arrayObjChecked) {
  const returnedObject = { containsAll:true, missingKey:undefined, indexValue:-1 };
  const aryLength = arrayObjChecked.length;
  for(let i=0;i<aryLength;i++) {
    const elem = arrayObjChecked[i];
    const rcdObj = objectKeyCheck(keysToCheck,elem);
    if(!rcdObj.containsAll) {
      returnedObject.containsAll = false;
      returnedObject.missingKey = rcdObj.missingKey;
      returnedObject.indexValue = i;
      return returnedObject;
    }
  }
  return returnedObject;
}

// ********************************************************
// validTokenCheck
// ********************************************************
function validTokenCheck(req, res, next) {
  const { authorization } = req.headers;

  const bearerToken = authorization && authorization.match('^Bearer (.+)$')[1];

  if (bearerToken) {
    jwt.verify(bearerToken, jwtSecret, function(err, decodedToken) {
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
    const tempObject = await db(table_name).where({ id }).first(); //Correct line of code - keep in final program version
    // const tempObject = await db('BAD').where({ id }).first(); //Bad line of code for testing - comment out in final program version
    if (!tempObject) {
      returnObject.idExists = false;
      returnObject.badId = id;
      return returnObject;
    }
    if(coach_id !== tempObject.coach_id) {
      returnObject.validCoachId = false;
      returnObject.badCId = id;
      return returnObject;
    }
  }
  return returnObject;
}