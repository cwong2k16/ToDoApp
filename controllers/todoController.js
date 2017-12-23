var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var data = [{item: 'learn node.js'}];
var urlEncodedParser = bodyParser.urlencoded({extended: 'false'});

mongoose.connect("mongodb://test:test@ds131137.mlab.com:31137/todo")

var schema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', schema);

module.exports = function(app){
    app.get('/todo', function(req, res){
        // Todo.find({}, ...) finds everything inside the database
        Todo.find({}, function(err, data){
            if(err){
                throw err;
            }
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlEncodedParser, function(req, res){
        var newTodo = Todo(req.body).save(function(err, data){
            if(err){
                throw err;
            }
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err){
                throw err;
            }
            res.json(data);
        });
    });
}