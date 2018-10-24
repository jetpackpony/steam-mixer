const { app, BrowserWindow } = require('electron');

let win;
function createWindow() { 
    win = new BrowserWindow({ width: 1600, height: 1300 });
    win.loadFile('index.html');
    win.webContents.openDevTools();
}

app.on('ready', createWindow);

