const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'js/preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    ipcMain.on('window-controls', (event, action) => {
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        
        switch(action) {
            case "minimize":
                win.minimize();
                break;
            case "maximize":
                if(!win.isMaximized()) {
                    console.log("Running maximize");
                    win.maximize();
                    break;
                } else {
                    win.restore();
                    break;
                }
            case "close":
                win.close();
        }
    })

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});