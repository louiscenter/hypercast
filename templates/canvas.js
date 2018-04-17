var html = require('choo/html')

module.exports = canvas

function canvas () {
  return html`<canvas width="${window.innerWidth}" height="${window.innerHeight}"></canvas>`
}
