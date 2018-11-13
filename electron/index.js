const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});

let win;
function createWindow() { 
    win = new BrowserWindow({ width: 1600, height: 1300 });
    win.loadURL(startUrl);
    win.webContents.openDevTools();
}

app.on('ready', createWindow);

