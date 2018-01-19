var html = require('choo/html')

module.exports = button

var colors = {
  grey: {background: '#999'},
  red: {background: '#ff001f'},
  green: {background: '#3ecf72'}
}

function button (obj) {
  var color = colors[obj.color]
  var style = `background: ${color.background}`

  return html`
    <button style=${style} onclick=${obj.onclick}>
      ${obj.text}
    </button>
  `
}
