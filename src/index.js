const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');


require("./database");

app.use(cors());
app.use(express.json());
app.use("/", require("./routes/index.js"));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload',
    limits: { fileSize: 10 * 1024 * 1024 } // Límite de 10 MB
}))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("server on port", port));
