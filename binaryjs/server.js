var BinaryServer = require('binaryjs').BinaryServer;
var fs           = require('fs');
var server       = BinaryServer({ port: 9400 });

// callback for new client connections
server.on('connection', function(client) {
  console.log('A Connection');
  // var file = fs.createReadStream(__dirname + '/../capture/audio/fall.mp3');
  // client.send(file);

  // var stream = client.createStream();
  // var file.pipe(stream);

  // client.on('stream', function(stream, meta) {
  //   client.send('stream_data');
  //   console.log("stream of data...");
  //   console.log(meta);
  //   stream.on('data', function(data){
  //     stream.write({ result: 'data...'})
  //   });
  // });

  client.on('stream', function(stream, meta){
    // console.log(stream);

    // broadcast to all other clients
    for(var id in server.clients) {
      console.log(id);
      if(server.clients.hasOwnProperty(id)){
        var other_client = server.clients[id];
        if(other_client != client){
          console.log('streaming to other clients');
          var send = other_client.createStream(meta);
          stream.pipe(send);
        } else {
          console.log('host streaming');
        }
      }
    }
  });
});

console.log('Server running at http://localhost:9400/');