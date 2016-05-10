var express = require('express'); // express server side framework
var app = express(); // create an express instance
var mongoose = require('mongoose'); // ORM for mongodb
var morgan = require('morgan'); // Log server data to console
var bodyParser = require('body-parser'); // access POST body
var path = require('path'); // access filesystem
var multer = require('multer'); // multipart form data middleware

// Configurations
app.set('views', __dirname + "/public"); // tell server where views are found
app.engine('html', require('ejs').renderFile); // Use ejs to render html filesystem
app.set('view engine', 'html'); // Tell view engine to look for html views

// Bring in api routes for players
var api = require('./player-api');

// Connect to mlabs mongodb
mongoose.connect('mongodb://test:pass123@ds013918.mlab.com:13918/baseball_app');

var db = mongoose.connection;
db.once('open', function() {
  console.log("Mongoose Connected!");
});
// Register morgan logger for dev mode
app.use(morgan('dev'));

// register and configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Register public directory for client side code and assets
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to attach multipart/formdata to the request: Allow file uploads
app.use(multer({dest: './public/uploads'}).single('file'));

// Register api routes
app.use('/api', api);
// Set default index route to render the index.html file

app.get('*', function (req, res) {
  res.render('index.html');
});

app.listen(process.env.PORT);
console.log("Server listening on port" + process.env.PORT);
