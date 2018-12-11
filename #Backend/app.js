let createError = require('http-errors')
let mongoose = require('mongoose')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let bodyParser = require('body-parser')

// defined router model
let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let guruRouter = require('./routes/guru')
let userRouter = require('./routes/user')
let jenisBarang = require('./routes/jenisBarang')
let barang = require('./routes/barang')
let detailBarang = require('./routes/detailBarang')

let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)

mongoose.Promise = global.Promise
// view engine setup
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  req.io = io
  next()
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// app.use(cors({ origin: 'http://localhost:4200', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// configuration url Service
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/guru', guruRouter)
app.use('/user', userRouter)
app.use('/jenis-barang', jenisBarang)
app.use('/barang', barang)
app.use('/detail-barang', detailBarang)

// konek ke mongoDB
mongoose.connect('mongodb://localhost:27017/getting-stared-nodejs', { useNewUrlParser: true }).then(() => console.log('MongoDB has Been Connected'))
  .catch((err) => console.error(err)
)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// event handler socket.io 
io.on('connection', function (socket) {
  socket.on('user', function (data) {
    console.log('client mengirim pesan => ' + data)
  })
  socket.on('jumlah', function (data) {
    var hasil = data.a + data.b
    socket.emit('hasil = ' + hasil)
  })
  socket.on('disconnect', function () {
    console.log('Client Disconnected')
  })
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
