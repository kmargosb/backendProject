const express = require('express');
const app = express();
const cors = require('cors');

require('./database')

app.use(cors());
app.use(express.json());

app.use('/', require('./routes/index.js'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log('server on port', port));
