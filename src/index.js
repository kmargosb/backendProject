const express = require("express");
const app = express();
const morgan = require('morgan')
const cors = require("cors");
const fileUpload = require('express-fileupload');



require("./database");

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))
app.use("/", require("./routes/index.js"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("server on port", port));
