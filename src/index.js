const { app, BrowserWindow,globalShortcut, webContents  } = require('electron');
const path = require('path');
const {execSync, spawn} = require('child_process')
const { ipcMain } = require('electron')
const { resolve } = require('path');

var botPid = 0;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 850,
    height: 450,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    resizable: true,
    icon: path.join(__dirname, '/icon/icon.ico'),
    title: 'Bookmark Bot'
    
  });
  mainWindow.setMenu(null)
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

};

app.on('ready', createWindow);

app.whenReady().then(() => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('Q', () => {
    killProcess(botPid);
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {

  globalShortcut.unregisterAll()
})

ipcMain.on('startBot',(event, arg) => {
  console.log('pid : '+arg[0])
  botPid = arg[0]
})

ipcMain.on('stoppedBot',(event, arg) => {

  botPid = 0
})

function killProcess(pid) {
  if(pid != 0){
    process.kill(pid,'SIGINT');
    console.log('process killed')
  }
}