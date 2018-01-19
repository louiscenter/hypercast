var html = require('choo/html')

module.exports = input

function input (obj) {
  return html`
    <input type="text" id="input-text" value=${obj.value} readonly></input>
  `
}
