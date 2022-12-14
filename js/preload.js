const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    windowControls: (action) => ipcRenderer.send('window-controls', action)
});