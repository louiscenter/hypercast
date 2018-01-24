var html = require('choo/html')
var onload = require('on-load')

var broadcast = require('../lib/broadcast')
var gum = require('../lib/gum')

var settings = require('./settings.js')

var button = require('./button')
var input = require('./input')
var label = require('./label')

module.exports = home

function home (state, emit) {
  var el = html`
    <div class="container">
      <video id="preview" autoplay muted></video>

      ${state.ui.settings ? settings(): null}

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
          </div>
          <div id="">
            ${button({
              color: 'grey',
              onclick: viewSettings,
              text: `Settings`
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

  function viewSettings () {
    emit('ui:settings')
  }

  onload(el, function () {
    gum(function (err, stream) {
      var elPreview = document.getElementById('preview')
      elPreview.srcObject = stream

      window.stream = stream
    })
  })

  return el

  function startBroadcast () {
    broadcast.start(function (key) {
      emit('broadcast:start', key)
    })
  }

  function stopBroadcast () {
    broadcast.stop(function () {
      emit('broadcast:stop')
    })
  }
}
