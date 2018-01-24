var choo = require('choo')
var app = choo()

app.use(function (state, emitter) {
  state.broadcast = {}
  state.broadcast.active = false
  state.broadcast.key = null

  state.ui = {}
  state.ui.settings = false

  emitter.on('broadcast:start', function (key) {
    state.broadcast.active = true
    state.broadcast.key = key

    emitter.emit('render')
  })

  emitter.on('broadcast:stop', function (key) {
    state.broadcast.active = false
    state.broadcast.key = null

    emitter.emit('render')
  })

  emitter.on('ui:settings', function () {
    state.ui.settings = !state.ui.settings
    emitter.emit('render')
  })
})

app.route('/', require('./templates/home'))

document.body.appendChild(app.start())
