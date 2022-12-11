const express = require('express');
const app = express();
const server = require('http').createServer(app);
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/dbConnect');
const users = require('./routes/userRoutes');
const meetRoutes = require('./routes/meetRoutes');
const errorMiddleware = require('./middleware/error');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const webSockets = require('./utils/websockets');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT;

// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

//Database Connection
dbConnection();

//Test api
app.get('/', (req, res) => {
  res.send('Running');
});

app.use('/api', users);
app.use('/api/meet', meetRoutes);

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const main = async () => {
  const server = await webSockets(app);
  return server;
};
main().then((server) => {
  server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});

app.use(errorMiddleware);
