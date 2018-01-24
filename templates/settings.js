var html = require('choo/html')

module.exports = function () {
  return html `
    <div class="modal container--settings">
      <div style="display: flex;">
      <h4>Settings</h4>
      </div>
      <div class="modal--body">
        <div class="input">
        <h5 class="label--input">Input Audio</h5>
          <input class="input-audio" />
        </div>
        <div class="input">
        <h5 class="label--input">Output Audio</h5>
          <input class="input-audio" />
        </div>
      </div>
      <div class="modal--footer">
        <div class="container--button">
          <button class="modal--button modal--button-confirm">Save</button>
          <button class="modal--button cancel">Cancel</button>
        </div>
      </div>
    </div>
  `
}
