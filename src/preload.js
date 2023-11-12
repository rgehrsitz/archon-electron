// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs').promises;

contextBridge.exposeInMainWorld('electron', {
    openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
    readFile: async (path) => {
        try {
            const data = await fs.readFile(path, 'utf8');
            return data;
        } catch (error) {
            console.error('Failed to read file', error);
            throw error;
        }
    }
});
