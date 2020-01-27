module.exports = {
  validBodyCheck,
  validTokenCheck,
};

const {jwtSecret} = require('../consts');


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
    let errMsg = "";

    if(Object.keys(body).length === 0) {
      isError = true;
      errMsg = "missing request body";
    } 
    else if(!isError) {
      propts.forEach(elem=>{
        if(!body[elem]) {
          isError = true;
          errMsg = `missing field ${elem} in request body`;
        }
      })  
    }

    if(isError) {
      res.status(400).json({ message: errMsg });
    }
    else {
      next();
    }    
  }
}

// ********************************************************
// validTokenCheck
// ********************************************************
function validTokenCheck(req, res, next) {
  const { authorization } = req.headers;

  if (authorization) {

    jwt.verify(authorization, jwtSecret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {

        req.token = decodedToken;

        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login first" });
  }
}