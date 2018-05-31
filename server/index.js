var socketApp = require('express')();
var http = require('http').Server(socketApp);
var io = require('socket.io')(http);

var lnglatData = { lng: 116.397983, lat: 40.356845 };
var onlineCount = 0;

io.set('origin', '*');
io.on('connection', function(socket) {
  // console.log(socket)
  let address = socket.handshake.address;
  console.log(`新页面${address}接入了socket`);
  io.emit('lnglat', { lnglat: lnglatData });

  //监听地图页面发送的经纬度信息
  socket.on('lnglat', function(obj) {
    obj.index = onlineCount++;
    lnglatData = obj;
    //广播消息
    io.emit('lnglat', { lnglat: obj });
    console.log('广播lnglat: ' + JSON.stringify(obj));
  });

  //向地图页面发送的经纬度信息
  socket.on('center', function(obj) {
    //广播消息
    io.emit('center', obj);
    console.log('广播center: ' + JSON.stringify(obj));
  });

  socket.on('drviceId', function(obj) {
    //广播消息
    io.emit('drviceId', obj);
    console.log('广播set: ' + JSON.stringify(obj));
  });
  socket.on('allPower', function(obj) {
    //广播消息
    setTimeout(()=>{
      io.emit('allPower', obj);
    },2000)
    console.log('广播set: ' + JSON.stringify(obj));
  });
  socket.on('token', function(obj) {
    //广播消息
    console.log(obj)
    setTimeout(()=>{
      io.emit('token', JSON.parse(obj));
    },2000)
    console.log('广播set: ' + JSON.parse(obj));
  });

});

io.listen(4000, { origins: '*' }, function() {
  console.log('listening on *:4000');
});
