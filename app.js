var express = require('express')
var path = require('path')
var bodyparser = require('body-parser')
var app = express()

app.use(bodyparser.json());
app.use('/api/posts', require('./controllers/api/posts'));
app.use(require('./controllers/static'));

app.use('/scripts', express.static('node_modules/bootstrap/dist/css/'));
app.use('/scripts', express.static('node_modules/angular/'));
app.use('/public', express.static('assets/'));
app.use('/fonts', express.static('node_modules/bootstrap/dist/fonts/'));
app.use('/public', express.static('styles/'));

app.listen(3000, function() {
  console.log('Server running on port 3000.');
})
