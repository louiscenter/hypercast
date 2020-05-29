
const { app, BrowserWindow } = require ('electron')

function createWindow() 
{
  const win = new BrowserWindow({
    width: 500,
    height: 397,
    minWidth: 500,
    minHeight: 397,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile("index.html");
  // win.webContents.openDevTools()

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)
console.log("Application is ready")

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}) 
