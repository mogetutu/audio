var BinaryServer = require('binaryjs').BinaryServer;
var fs           = require('fs');
var server       = BinaryServer({ port: 9400 });

// callback for new client connections
server.on('connection', function(client) {
  var file = fs.createReadStream(__dirname + '/gta-5-wallpaper.jpg');
  client.send(file);

  // var stream = client.createStream();
  // var file.pipe(stream);
});