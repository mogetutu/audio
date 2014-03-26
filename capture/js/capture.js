var errorCallback = function(e) {
  console.log('Rejected', e);
};

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if ( hasGetUserMedia() ) {
  navigator.getUserMedia = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;

  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  var context = new AudioContext();

  if(navigator.getUserMedia) {
    navigator.getUserMedia({
      audio: true
    }, function(stream){
      var mic = context.createMediaStreamSource(stream);
      var filter = context.createBiquadFilter();

      mic.connect(filter);
      filter.connect(context.destination);
      
    }, errorCallback);
  }
} else {
  alert('No User Media');
}