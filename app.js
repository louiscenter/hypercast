var electron = require('electron')
var path = require('path')

var win = null
var app = electron.app
var BrowserWindow = electron.BrowserWindow

app.on('ready', function () {
  console.log('The application is ready.')

  win = new BrowserWindow({
    width: 500,
    height: 397,
    minWidth: 500,
    minHeight: 397
  })

  win.loadURL('file://' + path.join(__dirname, 'index.html'))
  win.on('close', function () {
    win = null
  })

  // win.webContents.openDevTools()
})
