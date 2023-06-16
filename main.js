// const { default: installExtension, REDUX_DEVTOOLS} = require('electron-devtools-installer');

const COS = require("cos-js-sdk-v5");
const {
	app,
	BrowserWindow,
	globalShortcut,
	ipcMain,
	shell,
} = require("electron");
const path = require("path");
const url = require("url");

// 快捷键注册

if (process.env.NODE_ENV === "development") {
	require("electron-reloader")(module);
}

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 900,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
		autoHideMenuBar: true,
	});

	// 加载 React 应用
	if (process.env.NODE_ENV === "development") {
		win.loadURL("http://localhost:5173");

		win.webContents.openDevTools();
	} else {
		console.log("in prod", __dirname);
		win.loadFile(path.join(__dirname, "dist", "index.html"));
	}
}

app.whenReady().then(() => {
	createWindow();

	// installExtension(REDUX_DEVTOOLS)
	// 	.then((name) => console.log(`Added Extension:  ${name}`))
	// 	.catch((err) => console.log("An error occurred: ", err));
	// 安装Redux Toolkit的
	if (process.env.NODE_ENV === "development") {
		globalShortcut.register("CommandOrControl+Shift+i", function () {
			BrowserWindow.getFocusedWindow().webContents.openDevTools();
		});
	}
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
	ipcMain.on("download-file", (event, key) => {
		const cos = new COS({});

		cos.getObjectUrl(
			{
				Bucket: "YOUR_BUCKET_NAME",
				Region: "YOUR_BUCKET_REGION",
				Key: key,
			},
			function (err, data) {
				if (err) {
					event.reply("download-error", err.message);
				} else {
					var downloadUrl =
						data.Url +
						(data.Url.indexOf("?") > -1 ? "&" : "?") +
						"response-content-disposition=attachment";

					shell.openExternal(downloadUrl);
				}
			}
		);
	});
});

app.on("will-quit", () => {
	globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
