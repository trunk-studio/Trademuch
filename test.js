// var socketIOClient = require('socket.io-client');
// var sailsIOClient = require('sails.io.js');
//
// // Instantiate the socket client (`io`)
// // (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
// var io = sailsIOClient(socketIOClient);
//
// // Set some options:
// // (you have to specify the host and port of the Sails backend when using this library from Node.js)
// io.sails.url = 'http://localhost:1337';
// io.sails.transports = ['websocket']
//
// io.socket.get('/chat/1/history', function serverResponded (body, JWR) {
//   // body === JWR.body
//   console.log('Sails responded with: ', body);
//   console.log('with headers: ', JWR.headers);
//   console.log('and with status code: ', JWR.statusCode);
//
//   // When you are finished with `io.socket`, or any other sockets you connect manually,
//   // you should make sure and disconnect them, e.g.:
//   io.socket.disconnect();
//
//   // (note that there is no callback argument to the `.disconnect` method)
// });

var socket = require('socket.io-client')('ws://localhost:1337?__sails_io_sdk_version=0.13.5');
socket.on('connect', function(){
  console.log('==== connect ====');
  // var requestPost = {
  //   url: '/socket.io?__sails_io_sdk_version=0.13.5',
  //   headers: { accept: '*/*' }
  // };
  // socket.emit('get', requestPost, function(p1, p2){
  //   console.log('=== post data ===');
  //   console.log(p1);
  //   console.log(p2);
  // });

  var requestGet = {
    url: '/chat/1/history?id=',
    headers: { accept: '*/*' }
  };
  socket.emit('get', requestGet, function(p1, p2){
    console.log('=== get data ===');
    console.log(p1);
    console.log(p2);
  });

  var requestGet2 = {
    url: '/chat/1/history?id=',
    headers: { accept: '*/*' }
  };
  socket.emit('get', requestGet2, function(p1, p2){
    console.log('=== get data ===');
    console.log(p1);
    console.log(p2);
  });


});
