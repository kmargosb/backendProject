const userSchema = require("../models/user");
const productSchema = require("../models/product");
const User = require("../models/user");
const Product = require("../models/product");
const jwt = require("jsonwebtoken");
const cloudinary = require("../../middlewares/cloudinary.config");
const fs = require('fs-extra')

// PUBLIC ROUTES
exports.homePage = async (req, res) => {
  // await userSchema
  //   .find()
  //   .then((data) => res.json(data))
  //   .catch((err) => res.json({ message: err }));
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
    .catch((err) => res.json({ message: err }));
};
exports.addP = async (req, res) => {
  try {
    const { userId } = req;
    const { name, description, price } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      user: userId,
    });

    // console.log(req.files.image);

    if (req.files?.image) {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          folder: "products",
        }        
      );
      // console.log(result)
      newProduct.photoUrl = {
        public_id: result.public_id,
        imageURL: result.secure_url,
      };

      fs.unlink(req.files.image.tempFilePath) // Elimina el archivo de ./upload
    }

    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.usuario = async (req, res) => {
  const { userId } = req;
  await userSchema
    .findById(userId)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};
exports.setUser = async (req, res) => {
  try{
  const { userId } = req;
  const { username, firstname, lastname, email, password, picture } = req.body;

  const newUser = new User({
    username,
    firstname,
    lastname,
    email,
    password,
    picture
  })

  if (req.files?.image) {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        folder: "users",
      }       
    );
    // console.log(result)
    newUser.picture = {
      public_id: result.public_id,
      secure_url: result.secure_url
    };
    fs.unlink(req.files.image.tempFilePath) // Elimina el archivo de ./upload
  }
  await userSchema
    .updateOne(
      { _id: userId },
      { $set: { username, firstname, lastname, email, password, picture: newUser.picture } }
    )
    res.json(newUser);
  } catch (error){
    return res.status(500).json({ message: error.message });
  }    
};
exports.removeUser = async (req, res) => {
  const { userId } = req;
  await userSchema
    .deleteOne({ _id: userId })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};
