var context,
    bufferLoader;

window.onload = init;

function init() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      'audio/fall.mp3',
      'audio/derezzed-avicii.mp3',
    ],
    finishedLoading
  );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  console.log('finished loading buffer');

  // create two sources and play them both together
  var s1 = context.createBufferSource();
  // var s2 = context.createBufferSource();

  s1.buffer = bufferList[0];
  // s2.buffer = bufferList[1];

  s1.connect(context.destination);
  // s2.connect(context.destination);

  // s1.start(0);
  // s2.start(0);
}