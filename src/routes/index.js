const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  homePage,
  singUp,
  logIn,
  pHome,
  usuario,
  setUser
} = require("../controllers/routes.controllers");


//public routes
router.get("/", homePage);

router.post("/singup", singUp);

router.post("/login", logIn);

//private routes

router.get('/private_home', verifyToken, pHome);

router.get("/user", verifyToken, usuario);

router.put("/user", verifyToken, setUser);

module.exports = router;

function verifyToken(req, res, next) {
  console.log(req.headers.authorization);
  if(!req.headers.authorization) {
    return res.status(401).send('peticion prohibida')
  }
  const token = req.headers.authorization.split(' ')[1];
  if(token === null){
    return res.status(401).send('peticion prohibida');
  }
    const payload = jwt.verify(token, 'secretkey')
    req.userId = payload._id;
    next();
}
