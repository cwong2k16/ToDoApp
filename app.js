// in this app, i will follow the MVC design pattern
// this is the model

var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));
todoController(app);
app.listen(3000);