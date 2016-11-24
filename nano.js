'use strict';

var nano = require('nanomsg');

var rep = nano.socket('rep');
var req = nano.socket('req');

var addr = 'tcp://127.0.0.1:5555';

rep.bind(addr);
req.connect(addr);

rep.on('data', function (buf) {
  //console.log('received request: ', buf.toString());
  rep.send('world');
});

req.on('data', function (buf) {
  //console.log('received response: ', buf.toString());
});

setInterval(function () {
  req.send('hello');
}, 10);

var heapdump = require('heapdump');
var memwatch = require('memwatch-next');
//var hdLeak = new memwatch.HeapDiff();
memwatch.on('leak', function(info) {
  console.log('-------- <LEAK> -------');
  console.log(JSON.stringify(info));
  console.log('-------- </LEAK> -------');

  /*var diff = hdLeak.end();
  console.log('-------- <LEAK-DIFF> -------');
  console.log(JSON.stringify(diff));
  console.log('-------- </LEAK-DIFF> -------');
  hdLeak = new memwatch.HeapDiff();*/
});
