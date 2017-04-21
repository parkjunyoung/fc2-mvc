var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//flash  메시지 관련
var flash = require('connect-flash');

//passport 로그인 관련
var passport = require('passport');
var session = require('express-session');

//MongoDB 접속
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var autoIncrement = require('mongoose-auto-increment');

var db = mongoose.connection;
db.on('error', console.error);
db.on('open', function(){
    console.log('mongodb connect');
});

var connect = mongoose.connect('mongodb://127.0.0.1:27017/exercise');
autoIncrement.initialize(connect);



var index = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
var accounts = require('./routes/accounts');
var auth = require('./routes/auth');
var chat = require('./routes/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//업로드 path 추가
app.use('/uploads', express.static('uploads'));


//session 관련 셋팅
var sessionMiddleWare = session({
    secret: 'fastcampus',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2000 * 60 * 60 //지속시간 2시간
    }
});
app.use(sessionMiddleWare);

//passport 적용
app.use(passport.initialize());
app.use(passport.session());

//플래시 메시지 관련
app.use(flash());

//로그인 정보 뷰에서만 변수로 셋팅, 전체 미들웨어는 router위에 두어야 에러가 안난다
app.use(function(req, res, next) {
  app.locals.isLogin = req.isAuthenticated();
  //app.locals.urlparameter = req.url; //현재 url 정보를 보내고 싶으면 이와같이 셋팅
  //app.locals.userData = req.user; //사용 정보를 보내고 싶으면 이와같이 셋팅
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/posts', posts);
app.use('/accounts', accounts);
app.use('/auth', auth);
app.use('/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


//socket io 셋팅
app.io = require('socket.io')();
/*
app.io.on('connection', function(socket){
  console.log('socketio connected...');
});
*/
//socket io passport 접근하기 위한 미들웨어 적용
app.io.use(function(socket, next){
  sessionMiddleWare(socket.request, socket.request.res, next);
});
require('./libs/socketConnection')(app.io);
 


module.exports = app;
