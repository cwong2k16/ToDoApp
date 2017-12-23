var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var data = [{item: 'learn node.js'}];
var urlEncodedParser = bodyParser.urlencoded({extended: 'false'});

mongoose.connect("mongodb://test:test@ds131137.mlab.com:31137/todo")

var schema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', schema);
var itemOne = Todo({item: "learn react.js"}).save(function(err){
    if(err) throw err;
    console.log("item saved");
});

module.exports = function(app){
    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlEncodedParser, function(req, res){
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
}