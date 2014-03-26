var client = new BinaryClient('ws://localhost:9400');

client.on('stream', function(stream, meta) {
  var parts = [];

  stream.on('data', function(data) {
    parts.push(data);
  });

  stream.on('end', function() {
    var img = document.createElement("img");

    img.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));

    document.body.appendChild(img);
  })
});