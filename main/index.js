const fs = require('fs')
const url = require('url')
const path = require('path')
const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const log = require('electron-log')
const Store = require('electron-store')

log.transports.file.level = 'info'

const store = new Store({
  name: 'Blocks',
  defaults: {
    window: {
      width: 1280,
      height: 720
    },
    dirname: app.getPath('home'),
    recents: [],
    uiColor: '#000'
  }
})

let win
const createWindow = () => {
  const opts = Object.assign({
    minWidth: 768,
    minHeight: 512,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      scrollBounce: true,
      nodeIntegration: true
    }
  }, store.store.window)

  win = new BrowserWindow(opts)

  const URL = url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file',
    slashes: true,
    query: {}
  })

  win.loadURL(URL)

  win.on('close', _ => {
    const bounds = win.getBounds()
    store.set('window', bounds)
    win = null
  })

  win.webContents.on('will-navigate', e => {
    e.preventDefault()
  })
}

app.on('ready', () => {
  createWindow()
})

ipcMain.on('WINDOW_ERROR', (_, err) => {
  log.error(err)
})

ipcMain.on('write-file', (_, { filename, content }) => {
  if (!filename || !content) return

  fs.writeFile(filename, content, err => {
    if (err) log.error(err)
  })
})
