var getUserMedia = require('getusermedia')

module.exports = gum

function gum (cb) {
  getUserMedia(function (err, stream) {
    if (err) return cb(err)
    cb(null, stream)
  })
}
