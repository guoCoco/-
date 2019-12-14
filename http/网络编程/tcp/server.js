const net = require('net');

const server = net.createServer();

server.on('connection', function(socket) {
  socket.on('data', function(data){
    socket.write('你好');
  });

  socket.on('end', function() {
    console.log('end');
  });

  socket.write('welcome to china');
});

server.listen(8124);

