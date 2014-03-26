function gotStream(stream) {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  var audio_context = new AudioContext();

  var mediaStreamSource = audio_context.createMediaStreamSource( stream );

  // Connect it to the destination to hear yourself ( or any other node for processing! )
  mediaStreamSource.connect(audio_context.destination);
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia({ audio: true }, gotStream);