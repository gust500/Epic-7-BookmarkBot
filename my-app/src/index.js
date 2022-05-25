const { app, BrowserWindow,globalShortcut, webContents  } = require('electron');
const path = require('path');
const {execSync, spawn} = require('child_process')
const { ipcMain } = require('electron')

var pythonExecutable = path.join(__dirname, "python/venv/Scripts/python.exe");
console.log(pythonExecutable)
var process = 0;

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
    resizable: false
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

};

app.on('ready', createWindow);

app.whenReady().then(() => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('Q', () => {
    botOff();
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



ipcMain.on('getWindows',(event, arg) => {
  
  var result = execSync(pythonExecutable+" "+path.join(__dirname,"python/getWindows.py"));
  console.log(result.toString())

  event.returnValue = result;
})

ipcMain.on('startBot',(event, arg) => {
  console.log(arg[0])
  console.log(arg[1])
  var result = execSync(pythonExecutable+' '+path.join(__dirname,"python/resizeWindow.py")+' "'+arg[0]+'"');
  
  process = spawn(pythonExecutable,[path.join(__dirname,'python/bot.py'),arg[1],path.join(__dirname,"python/")]);

  process.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  process.stderr.on('data', (data) => {
    console.log('bruh')
    console.log(data.toString());
  });
  process.on('close',(code) => {
    process = 0
  })
})

function botOff() {
  if(process != 0){
    process.kill('SIGINT')
    process = 0
  }
}