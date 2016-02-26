'use strict';

var mocky = require('mocky');
var memos = require('./data.json');

mocky.createServer([{
  url: '/memos',
  method: 'get',
  res: function(req, res, callback) {
    if (0 < memos.length) {
      callback(null, {
        status: 201,
        headers: {'Content-type': 'text/json'},
        body: JSON.stringify(memos)
      });
    } else {
      callback(null, {
        status: 404,
        headers: {'Content-type': 'text/json'},
        body: JSON.stringify({message: 'There is no data'})
      });
    }
  }
},
{
  url: '/memos',
  method: 'post',
  res: function(req, res, callback) {
    var query = JSON.parse(req.body);
    var contents = query.contents;

    if ('' === contents) {
      callback(null, {
        status: 400,
        headers: {'Content-type': 'text/json'},
        body: JSON.stringify({message: 'Contents is required'})
      });
      return;
    }

    var m = {
      id: (memos.length + 1) + '',
      contents: contents,
      priority: ''
    };

    memos.push(m);

    callback(null, {
      status: 200,
      headers: {'Content-type': 'text/json'},
      body: JSON.stringify(m)
    });
  }
},
{
  url: /memos\/[1-9]+/,
  method: 'put',
  res: function(req, res, callback) {
    var id = req.url.split('/')[2];
    var query = JSON.parse(req.body);
    var contents = query.contents;
    var priority = query.priority;

    if ('' === contents) {
      callback(null, {
        status: 400,
        headers: {'Content-type': 'text/json'},
        body: JSON.stringify({message: 'Contents is required'})
      });
      return;
    }

    var index = memos.findIndex(function(element, index, array) {
      return (id === element.id);
    });

    if (0 <= index) {
      var m = memos[index];

      m.contents = contents || m.contents;
      m.priority = priority || m.priority;

      callback(null, {
        status: 200,
        headers: {'Content-type': 'text/json'},
        body: JSON.stringify(m)
      });
    } else {
      callback(null, {
        status: 404,
        headers: {'Content-type': 'text/json'},
        body: JSON.stringify({message: 'Id "' + id + '" is not found'})
      });
    }
  }
},
{
  url: /memos\/[1-9]+/,
  method: 'delete',
  res: function(req, res, callback) {
    var id = req.url.split('/')[2];

    console.log('DELETE url = ' + req.url);
    console.log('DELETE id = ' + id);

    var index = memos.findIndex(function(element, index, array) {
      return (id === element.id);
    });

    console.log('DELETE index = ' + index);

    if (0 <= index) {
      var m = memos[index];
      memos.splice(index, 1);

      callback(null, {
        status: 204,
        headers: {'Content-type': 'text/json'},
        body: JSON.stringify(m)
      });
    } else {
      callback(null, {
        status: 404,
        headers: {'Content-type': 'text/json'},
        body: JSON.stringify({message: 'Id "' + id + '" is not found'})
      });
    }
  }
}]).listen(4321);
