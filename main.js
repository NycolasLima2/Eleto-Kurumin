const express = require('express');
const cors = require('cors');


const APP = express();
APP.use(cors());
APP.use(express.json());


const PORT = 3000;
const SERVER = "localhost";
const MSG = `Servidor Online em ${SERVER}:${PORT}`;
APP.listen(PORT, () => console.log(MSG));