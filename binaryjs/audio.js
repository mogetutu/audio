var client = new BinaryClient('ws://localhost:9400');
var context;

var recBuffersL = [];
var recBuffersR = [];
var recLength = 0;

var buffers = [];

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
window.AudioContext    = window.AudioContext || window.webkitAudioContext;


function mergeBuffers(recBuffers, recLength){
  var result = new Float32Array(recLength);
  var offset = 0;
  for (var i = 0; i < recBuffers.length; i++){
    result.set(recBuffers[i], offset);
    offset += recBuffers[i].length;
  }
  return result;
}

navigator.getUserMedia({ audio: true }, function( stream ) {

  context = new AudioContext();

  var mic = context.createMediaStreamSource( stream );
  mic.connect(context.destination);

  var bufferLen = 4096;
  var node = context.createJavaScriptNode(bufferLen, 2, 2);

  node.onaudioprocess = function(e) {
    // var s = client.send(e.inputBuffer);

    // var buff = Base64Binary.decodeArrayBuffer(buffer.toString()); 

    var input_buffer = [
      e.inputBuffer.getChannelData(0),
      e.inputBuffer.getChannelData(1),
    ];

    recBuffersL.push(input_buffer[0]);
    recBuffersR.push(input_buffer[1]);
    recLength += input_buffer[0].length;

    // this is a chunk of whatever was recorded

    var bufferL = mergeBuffers(recBuffersL, recLength);
    var bufferR = mergeBuffers(recBuffersR, recLength);

    console.log(bufferL.buffer);

    client.send(bufferL.buffer, 'leftBufferStream');
    client.send(bufferR.buffer, 'rightBufferStream');

    // buffers.push(mergeBuffers(recBuffersL, recLength));
    // buffers.push(mergeBuffers(recBuffersR, recLength));

    // console.log(buffers[0].buffer);

    // console.log(recLength);

    // var s = client.send(recBuffersR, recLength);

    // var tx = 0;
    // s.on('data', function(data){
    //   $('#data-dump').text(data);
    // });
  }

  mic.connect(node);
  node.connect(context.destination);
});