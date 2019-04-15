import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 680,
    useContentSize: true,
    width: 1000
  })
  
  /* PROXY SETTINGS */
   /*if (process.env.NODE_ENV === 'development')
   {
     mainWindow.webContents.session.setProxy({proxyRules:'http://192.168.10.1:3128', proxyBypassRules: 'localhost'}, function ()
     {
       mainWindow.loadURL(winURL)
     })
   }
   else
   {
     mainWindow.loadURL(winURL)
   }
   /* PROXY SETTINGS */
 
   /*mainWindow.webContents.session.setProxy({proxyRules:'http://192.168.10.1:3128', proxyBypassRules: 'localhost'}, function ()
   {
     mainWindow.loadURL(winURL)
   })*/

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

/* LOGIN */
/*app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('bpv', '7n5bkr')
})*/
/* LOGIN */

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
