// Config env
require('dotenv').config()
var http = require('http');
const bodyParser = require("body-parser");
const cors = require('cors');
const express = require("express");
//const logger = require("morgan");
const mongoClient = require("mongoose");
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
//
// setup connect mongodb by mongoose
mongoClient
  .connect("mongodb+srv://tiennv:tienNv97%40%40@cluster0-ypshb.mongodb.net/shinro?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected database from mongodb."))
  .catch((error) =>
    console.error(`❌ Connect database is failed with error which is ${error}`)
  );

const app = express();
app.set('port', port);
var server = http.createServer(app);
var io = require('socket.io')(server);
require('./socketio/socketio')(app, io);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

const deckRoute = require("./routes/deck");
const userRoute = require("./routes/user");
const questionRoute = require("./routes/question");

// Middlewares
//app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/decks", deckRoute);
app.use("/users", userRoute);
app.use("/question", questionRoute);

// Routes
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Server is OK!",
  });
});

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // response to client
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
//const port = app.get("port") || 3000;
//app.listen(port, () => console.log(`Server is listening on port ${port}`));
/**
 * Event listener for HTTP server "listening" event.
 */
//
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
//
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('http://localhost:3000');
}