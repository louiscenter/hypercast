var html = require('choo/html')

module.exports = label

var colors = {
  grey: {background: '#bbb'},
  red: {background: '#ff001f'}
}

function label (obj) {
  var color = colors[obj.color]
  var style = `background: ${color.background};`

  return html`
    <div id="label" style=${style}>
      ${obj.text}
    </div>
  `
}
