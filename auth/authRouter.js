const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Coaches = require('../coaches/coaches-model');

const {jwtSecret,hashRounds} = require('../consts');

module.exports = router;

const {
  validBodyCheck,
  validTokenCheck,
} = require('../middleware/custom_middleware');



// ********************************************************
// POST /auth/register
// ********************************************************
router.post('/register',
  validBodyCheck(["first_name","last_name", "username","password"]),
  (req,res)=>{
    let coachesInfo = req.body;

    // hash the password
    // hashRounds is the number of rounds (2^14) - iterations
    const hash = bcrypt.hashSync(coachesInfo.password, hashRounds);

    // override the plain text password with the hash
    coachesInfo.password = hash;

    Coaches.addCoach(coachesInfo)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }

)



// ********************************************************
// POST /auth/login
// ********************************************************
router.post("/login",
  validBodyCheck(["username","password"]),
  (req,res)=>{
    let {username, password} =req.body;
    // console.log("In router.post",username,password);
    Coaches.findCoachBy(username)
      .then(user=>{
        if (user && bcrypt.compareSync(password, user.password)) {

        //Create a token
        const token = signToken(user);

          res.status(200).json({ token, message: "Logged In", coachID:user.id, username:user.username });
        }
        else {
          res.status(401).json({ message: "Failed to login. Incorrect username or password" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
)


// ********************************************************
// signToken
// ********************************************************
function signToken(user) {
  const payload = {
    coachID: user.id
  };

  const secret = jwtSecret;

  const options = {
    expiresIn: "24h",
  };

  return jwt.sign(payload, secret, options); 
}



// ********************************************************
// GET /auth/logincheck
// ********************************************************
router.get('/logincheck',
  validTokenCheck,
  (req,res)=> {
    res.status(200).send("You are on a restricted page");
  }
)