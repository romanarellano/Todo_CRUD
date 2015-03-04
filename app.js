var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.static(__dirname + '/public'));
app.set('view engine','jade');
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost/Todo_CRUD',function (err){

  if(err)console.log(err);

});

var Schema = mongoose.Schema;


var ToDoSchema = new Schema({

  title: String,
  description: String,
  is_done: Boolean,
  created_at: Date

});

var Task = mongoose.model("ToDo", ToDoSchema);



app.get('/new_todo', function (req,res){

  res.render('new_todo');

  

});

app.get('/',function (req,res){

  // console.log('todo');
  
  Task.find(function(err,items){
    if(err) throw err;
    res.render("todos", { todos : items} );

  });
});

app.post('/todos',function (req,res){

  var todo = new Task ({
     title: req.body.title,
     description: req.body.description,
     is_done: req.body.is_done,
     created_at: new Date()
  });

  todo.save(function (err){

    if(err) throw err;
    console.log("ok!");

     res.redirect('/');

  });

  

});

app.get('/edit/:id', function (req,res){

  Task.findOne({_id : req.params.id}, function(err,todo){

    if(err) throw err;
    res.render('edit', { ToDo : todo});

  });

});

app.put('/edit/:id', function (req,res){

  Task.findOneAndUpdate({ _id : req.params.id},{
    $set: { 

      title: req.body.title,
      description: req.body.description
    
    }}, function (err){
          
          if (err) throw err;
          res.redirect('/');

        });
    
});

app.delete("/destroy/:id",function (req,res){

  Task.findById(req.params.id, function (err,item){

    item.remove(function (err,todo){
        if(todo === null){

          console.log("null");
        }
        res.redirect('/');

    });
  });
});
var num=0;
app.put('/check/:id/complete', function (req, res) {
  var toCheck = req.params.id;
  // console.log("id coming in" ,toDoId);
  num++;
  document.getElementById("counter").innerHTML = num;

  Task.findOneAndUpdate({_id : toCheck}, { $set: {
    is_done : true
  }}, function (err){
    if (err) throw err;
    res.send('Okay');
  });
});

app.put('/check/:id/incomplete', function (req, res) {
  var toUncheck = req.params.id;
  Task.findOneAndUpdate({_id : toUncheck}, { $set: {
    is_done : false
  }}, function (err, todo){
    if (err) throw err;
    res.send('Okay');
  });
});
  



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});