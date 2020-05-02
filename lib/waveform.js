module.exports = setupWaveform;

// from here: https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js
function setupWaveform(canvas) {
  var ctx = canvas.getContext("2d"),
    audioCtx = new AudioContext(),
    analyser = audioCtx.createAnalyser();

  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;
  analyser.fftSize = 2048;
  var bufferLength = analyser.fftSize;
  var dataArray = new Uint8Array(bufferLength);

  function draw() {
    analyser.getByteTimeDomainData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 0, 0)";

    ctx.beginPath();

    var sliceWidth = (canvas.width * 1.0) / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0;
      var y = (v * canvas.height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    requestAnimationFrame(draw);
  }
  function resize() {
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
    requestAnimationFrame(draw);
  }
  window.addEventListener("resize", resize);
  resize();
  return { audioCtx, analyser };
}
