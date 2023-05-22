const userSchema = require("../models/user");
const productSchema = require("../models/product");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cloudinary = require("../../middlewares/cloudinary.config");
const Product = require("../models/product");

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
  const newUser = new User({
    username,
    firstname,
    lastname,
    email,
    password,
    picture,
  });
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
  console.log(token);
  return res.status(200).json({ token });
};


// PRIVATE ROUTES
exports.pHome = async (req, res) => {
  await productSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({message: err}));
};
exports.addP = async (req, res) => {
  const { userId } = req;
  const { name, description, price, photoUrl } = req.body;  
  // const result = await cloudinary.uploader.upload(req.files.path);
  // console.log(result)
  // const public_id = result.public_id;
  // const imageURL = result.url;
  
  // console.log(newProduct);
  const newProduct = new Product({
    name,
    description,
    price,
    photoUrl,
    user: userId
  });
  await newProduct.save();
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

  console.log(req.files);

  if (req.files && req.files.picture) {
    try {
      const uploadedImage = await cloudinary.uploader.upload(
        req.files.picture.tempFilePath,
        {
          folder: "profiles",
        }
      );

      const { public_id, secure_url } = uploadedImage;
      req.body.picture = { public_id, secure_url };
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error al subir la imagen a Cloudinary" });
    }
  }

  await userSchema
    .updateOne(
      { _id: userId },
      { $set: { username, firstname, lastname, email, password, picture } }
    )
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};
exports.removeUser = async (req, res) => {
  const { userId } = req;
  await userSchema
    .deleteOne({ _id: userId })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};
