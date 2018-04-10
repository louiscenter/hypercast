var html = require('choo/html')
var onload = require('on-load')

var broadcast = require('../lib/broadcast')
var gum = require('getusermedia')

var button = require('./button')
var input = require('./input')
var label = require('./label')
var canvas = require('./canvas')
var setupWaveform = require('../lib/waveform')

module.exports = home

function home (state, emit) {
  var waveformEl = canvas()
  var el = html`
    <div id="container">
      <video id="preview" autoplay muted></video>
      ${state.broadcast.audioOnly ? waveformEl : ''}
      <div id="interface">
        <div id="nav">
          ${label({
            color: !state.broadcast.active ? 'grey' : 'red',
            text: !state.broadcast.active ? 'Standby' : 'On Air'
          })}
          <div id="actions">
            ${button({
              color: !state.broadcast.active ? 'green' : 'grey',
              onclick: !state.broadcast.active ? startBroadcast : stopBroadcast,
              text: `${!state.broadcast.active ? 'Start' : 'Stop'} Broadcast`
            })}
            ${button({
              color: 'grey',
              onclick: onAudioToggle,
              text: state.broadcast.audioOnly ? 'Audio-only' : 'Audio + Video'
            })}
          </div>
        </div>

        <div id="nav">
          <div></div>
          <div id="share">
            ${state.broadcast.key
              ? input({value: `dat://${state.broadcast.key}`})
              : null
            }
          </div>
        </div>
      </div>
    </div>
  `
  var audioCtx, analyser;

  onload(el, setStream)
  onload(waveformEl, onCanvas, setStream)
  return el

  function setStream() {
    gum({ audio: true, video: !state.broadcast.audioOnly }, function (err, stream) {
      if (err) return console.error(err);
      var elPreview = document.getElementById('preview')
      elPreview.srcObject = stream
      if (audioCtx) {
         audioCtx.createMediaStreamSource(stream)
          .connect(analyser);
      }
      window.stream = stream
    })
  }

  function onCanvas(canvas) {
    var result = setupWaveform(canvas)
    audioCtx = result.audioCtx;
    analyser = result.analyser;
    setStream()
  }

  function startBroadcast () {
    broadcast.start(function (key) {
      emit('broadcast:start', key)
    }, state.broadcast.audioOnly)
  }

  function stopBroadcast () {
    broadcast.stop(function () {
      emit('broadcast:stop')
    })
  }

  function onAudioToggle() {
    emit('audioOnlyToggle')
  }
}
