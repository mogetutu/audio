console.log('creating client...');
var client = new BinaryClient('ws://localhost:9400');

console.log('waiting for stream...');
client.on('stream', function(stream, meta) {
  var parts = [];

  console.log('stream accepted...');

  // console.log(stream);

  console.log(meta);

  stream.on('data', function(data) {
    // console.log('sent data...');
    // console.log(data);

    // parts.push(data);
  });

  stream.on('end', function() {
    // console.log('stream over');

    // var au = document.createElement("audio");
    // au.autoplay = true;
    // au.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
    // document.body.appendChild(au);
  })
});