const userSchema = require("../models/user");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// PUBLIC ROUTES
exports.homePage = async (req, res) => {
  await userSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};
exports.singUp = async (req, res) => {
  // console.log(req.body);
  const { username, firstname, lastname, email, password, picture } = req.body;
  const user = await User.findOne({ email });
  if (user) return res.status(401).send("el correo ya existe");

  // console.log(newUser);
  const newUser = new User({ username, firstname, lastname, email, password, picture });
  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, "secretkey");
  res.status(200).json({ token });
};
exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("el correo no existe");
  if (user.password !== password)
    return res.status(401).send("contraseña incorrecta");

  const token = jwt.sign({ _id: user._id }, "secretkey");
  return res.status(200).json({ token });
};


// PRIVATE ROUTES
exports.pHome = async (req, res) =>{
  // res.status(200).json({ userId: req.userId });
  // const { userId } = req;
  //   await userSchema
  //     .findById(userId)
  //     .then((data) => res.json(data))
  //     .catch((err) => res.json({ message: err }));
    
}
exports.usuario = async (req, res) => {
    const { userId } = req;
    await userSchema
      .findById(userId)
      .then((data) => res.json(data))
      .catch((err) => res.json({ message: err }));
    
  };
exports.setUser = async (req, res) => {
  const { userId } = req;
  const { username, firstname, lastname, email, password, picture } = req.body;
  await userSchema
    .updateOne(
      { _id: userId },
      { $set: { username, firstname, lastname, email, password, picture } }
    )
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};


