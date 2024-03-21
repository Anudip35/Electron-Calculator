const { contextBridge, ipcRenderer } = require("electron");

// Expose IPC functions to the renderer process
contextBridge.exposeInMainWorld("ipc", {
  invoke: (channel, data) => {
    return ipcRenderer.invoke(channel, data);
  },
});
