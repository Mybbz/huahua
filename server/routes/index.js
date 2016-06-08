(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db = mongojs('meanTodo', ['todos']);
  var http = require('http');
  var fs = require('fs');
  var url = require('url');
  var path = require('path');


  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/api/todos', function(req, res) {
    db.todos.find(function(err, data) {
      res.json(data);
    });
  });

  router.post('/api/todos', function(req, res) {
    db.todos.insert(req.body, function(err, data) {
      res.json(data);
    });
  });

  router.put('/api/todos', function(req, res) {
    db.todos.update(
      {
        _id: mongojs.ObjectId(req.body._id)
      }, 
      {
        isCompleted: req.body.isCompleted,
        title: req.body.title,
        detail: req.body.detail,
        date: req.body.date,
        type: req.body.type,
        image: req.body.image
      }, 
      {}, 
      function(err, data) {
        res.json(data);
      }
    );
  });

  router.delete('/api/todos/:_id', function(req, res) {
    db.todos.remove(
      {
        _id: mongojs.ObjectId(req.params._id)
      }, 
      '', 
      function(err, data) {
        res.json(data);
      }
    );
  });

  function getImages(dir, callback) {
    var fileType = /.jpg|.gif|.png/;

    fs.readdir(dir, function(err, files) {
      callback(err, files.filter(function(file){
        return fileType.test( path.extname(file));
      }));
    });
  }

  router.get('/image/gallery', function(req, res) {
    getImages(path.join(__dirname, '../../client/image/gallery'), function(err, list){
      res.status(200).json(list);
    });
  });

  module.exports = router;
}());