const { app, BrowserWindow } = require("electron");
const path = require("path");
const url=require('url')

if (process.env.NODE_ENV === 'development') {
    require('electron-reloader')(module);
  }

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	// 加载 React 应用
	if (process.env.NODE_ENV === "development") {
		win.loadURL("http://localhost:5173");
        win.webContents.openDevTools();
	} else {
        console.log('in prod',__dirname)
        win.loadFile(path.join(__dirname, 'dist', 'index.html'))
	}
}

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
