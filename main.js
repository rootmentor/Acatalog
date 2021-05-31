const { BrowserWindow, app } = require('electron');
require('@electron/remote/main').initialize();

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 810,
        height: 600,
        minWidth: 400,
        minHeight: 400,
        frame: false,
        show: false,
        backgroundColor: "#000",
        icon: "./Acatalog.ico",
        webPreferences: {
            enableRemoteModule: true,
            contextIsolation: false,
            nodeIntegration: true,
            devTools: false,
        }
    });

    win.loadFile('./build/index.html');
    // win.loadURL('http://localhost:3000');

    win.on('ready-to-show', () => {
        win.show();
    })

    win.on('closed', () => {
        win = null
    })
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})