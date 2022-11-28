const express = require('express');
const app = express();
const server = require('http').createServer(app);
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/dbConnect');

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;
//Database Connection
dbConnection();

//Test api
app.get('/', (req, res) => {
  res.send('Running');
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
