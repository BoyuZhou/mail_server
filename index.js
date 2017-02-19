var express = require('express')
var log4js = require('log4js')
var router = require('./routes/index')
var middleware = require('./utils/middleware')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

log4js.configure({
 appenders: [
   { type: 'console' },
   { type: 'file', filename: './logs/cheese.log', category: 'cheese' }
  ]
});

var logger = log4js.getLogger('cheese');
logger.setLevel('INFO');

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//扩展api错误和正确结果
app.use(middleware.extendAPIOutput);

//扩展错误处理
app.use(middleware.apiErrorHandle);

//使用日志
app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url :date' }));

app.use('/',router);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(3000, function () {
    console.log('server listen with 3000');
})
