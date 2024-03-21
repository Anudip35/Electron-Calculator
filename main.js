const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs").promises;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("calculate", (event, { num1, num2, operator }) => {
    let result;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
        break;
      default:
        result = "Invalid operator";
    }

    logOperation(`${num1} ${operator} ${num2} = ${result}`);
    return result;
  });

  win.loadFile("index.html");
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

const logFilePath = path.join(__dirname, "logs", "calculation_log.txt");

logOperation = async (operation) => {
  const timestamp = new Date().toLocaleString();
  const logEntry = `${timestamp}: ${operation}`;

  console.log(logEntry);
  await fs.appendFile(logFilePath, logEntry + "\n");
};
