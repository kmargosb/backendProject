const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  homePage,
  singUp,
  logIn,
  pHome,
  usuario,
  setUser,
  removeUser,
  addP
} = require("../controllers/routes.controllers");


//public routes
router.get("/", homePage);

router.post("/singup", singUp);

router.post("/login", logIn);

//private routes

router.get('/private-homepage', verifyToken, pHome);

router.get("/user", verifyToken, usuario);

router.post('/add-product', verifyToken, addP)

router.put("/user", verifyToken,  setUser);

router.delete("/user", verifyToken, removeUser);

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
    console.log(payload)
    req.userId = payload._id;
    next();
}
