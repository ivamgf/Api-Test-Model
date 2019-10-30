// Variables
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/registerUser');
var updateRouter = require('./routes/updateUser');
var deleteRouter = require('./routes/deleteUser');

// Initial App
var app = express();

// Constants App
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ivamgf:10106088@cluster0-diple.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("db_module_test").collection("users");
  // perform actions on the collection object
  client.close();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registerUser', registerRouter);
app.use('/updateUser', updateRouter);
app.use('/deleteUser', deleteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// render page
app.listen(3000, () => {
  console.log('Loading Api Test Module - Powered By Nodejs + Express');
});

// exports
module.exports = app;
