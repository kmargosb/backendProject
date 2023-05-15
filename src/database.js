const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)  
    .then(() => console.log('Database esta conectada'))
    .catch((error) => console.log(error));