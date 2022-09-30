"use strict";
// 加载主进程以及部分配置的API
import {
  app,
  protocol,
  BrowserWindow,
  Menu,
  ipcMain,
  globalShortcut,
  ipcRenderer,
  screen,
} from "electron";
// 加载程序窗口导航工具配置
import installExtension, {
  VUEJS_DEVTOOLS
} from "electron-devtools-installer";
import buildMenu from "./buildMenu";
import {
  createProtocol,
  installVueDevtools,
} from "vue-cli-plugin-electron-builder/lib";
// 加载更新检测程序
// import updateServer from './utils/updateServer2'
// 判断当前环境
const isDevelopment = process.env.NODE_ENV !== "production";
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let newWindow;

// Scheme must be registered before the app is ready
// 注册协议
protocol.registerSchemesAsPrivileged([{
  scheme: "app",
  privileges: {
    secure: true,
    standard: true
  }
}, ]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    backgroundColor: "#fff",
    closable: true, // 窗口是否可以关闭
    // 隐藏窗口栏
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      // webSecurity: false
    },
  });
  Menu.setApplicationMenu(Menu.buildFromTemplate(buildMenu(win)));
  // 隐藏菜单栏
  // Menu.setApplicationMenu(null)
  win.setTitle("消防集中监控系统");
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
  // 导出相关代码
  win.webContents.session.on("will-download", (event, item, webContents) => {
    item.once("done", (event, state) => {
      switch (state) {
        case "completed": {
          win.webContents.send("downloadEnd", "");
          break;
        }
        case "cancelled": {
          win.webContents.send("downLoadCancelled", "");
          break;
        }
        case "interrupted": {
          win.webContents.send("downLoadError", "");
          break;
        }
        default: {
          win.webContents.send("downLoadError", "");
          break;
        }
      }
    });
    item.on("updated", (event, state) => {
      if (state == "interrupted") {
        win.webContents.send("downLoadInterrupted", "");
        return false;
      }
    });
  });

  win.on("closed", () => {
    win = null
  });

  // 非开发环境启动更新服务器
  // !isDevelopment && updateServer(win);
  // updateServer(win)

  // 以下是打印功能的相关代码，参考：https://juejin.im/entry/5aa1e9196fb9a028d70032bd
  // TODO 理想情况下，子窗口的大小应该不能大于父窗口。所以父、子窗口理论上应该都要限制最小宽高，可根据根据之后的实际情况再进行设置
  let printWindow = null;
  ipcMain.on("printOpenWindow", (event, {
    printHtml,
    origin
  }) => {
    printWindow = new BrowserWindow({
      width: 1200,
      height: 700,

      modal: true,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    });
    // printWindow.loadURL(path.join('file:', __dirname, '../public/print/print.html'))
    printWindow.loadURL(origin + "/print/print.html");
    printWindow.webContents.on("dom-ready", () => {
      printWindow.webContents.send("printAppendContent", printHtml);
    });
  });

  ipcMain.on("printAction", () => {
    printWindow.webContents.print({
        silent: false,
        printBackground: false,
        deviceName: ""
      },
      printCloseWindow
    );
  });
  ipcMain.on("clear", () => {
    const clearObj = {
      storages: [
        "appcache",
        "filesystem",
        "shadercache",
        "websql",
        "serviceworkers",
        "cachestorage",
      ],
    };
    win.webContents.session.clearStorageData(clearObj);
  });
  ipcMain.on("printCloseWindow", printCloseWindow);

  ipcMain.on("closeWin", () => {
    app.exit() // 直接退出应用程序
    win = null // 主窗口设置为null防止内存溢出
  });
  ipcMain.on("maxWin", () => {
    if (win.isMaximized()) {
      win.unmaximize();
      win.webContents.send("unmaximize", "");
    } else {
      win.maximize();
      win.webContents.send("maximize", "");
    }
  });
  ipcMain.on("minWin", () => {
    win.minimize();
  });

  function printCloseWindow() {
    if (!printWindow) return;
    printWindow.hide();
    printWindow.destroy();
    printWindow = null;
  }

  // 扩展屏设计
  let isShow = false;
  let num = 0;
  let time = null;
  ipcMain.on("showExtendScreen", () => {
    isShow = false;
    // console.log('showExtendScreen')
    // setTimeout(()=> {
    let displays = screen.getAllDisplays();
    let externalDisplay = displays.find((display) => {
      return display.bounds.x !== 0 || display.bounds.y !== 0;
    });
    if (externalDisplay && isShow === false) {
      newWindow = new BrowserWindow({
        fullscreen: true,
        x: externalDisplay.bounds.x,
        y: externalDisplay.bounds.y,
        frame: false,
        minimizable: false, // 最小化
        maximizable: false, // 最大化
        closable: true, // 窗口是否可以关闭
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
        },
      });

      isShow = true;

      if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        newWindow.loadURL(
          process.env.WEBPACK_DEV_SERVER_URL + "/#/ExtendScreenAlarm"
        );
      } else {
        newWindow.loadURL("app://./index.html#/ExtendScreenAlarm");
      }
    }
    // },3000)

    let time = setInterval(() => {
      // num++
      displays = screen.getAllDisplays();
      externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0;
      });
      console.log("showExtendScreen", externalDisplay);
      console.log("showExtendScreen", isShow);

      if (externalDisplay && isShow === false) {
        newWindow = new BrowserWindow({
          fullscreen: true,
          x: externalDisplay.bounds.x,
          y: externalDisplay.bounds.y,
          frame: false,
          minimizable: false, // 最小化
          maximizable: false, // 最大化
          closable: true, // 窗口是否可以关闭
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
          },
        });

        isShow = true;

        if (process.env.WEBPACK_DEV_SERVER_URL) {
          // Load the url of the dev server if in development mode
          newWindow.loadURL(
            process.env.WEBPACK_DEV_SERVER_URL + "/#/ExtendScreenAlarm"
          );
        } else {
          newWindow.loadURL("app://./index.html#/ExtendScreenAlarm");
        }
      }
      console.log("showExtendScreen", newWindow);
      if (!externalDisplay && isShow && newWindow) {
        isShow = false;
        newWindow.close();
        newWindow = null;
      }
    }, 10000);
  });

  ipcMain.on("closeExtendScreen", () => {
    if (isShow) {
      newWindow.close();
    }
  });
  newWindow.on("closed", () => {
    // isShow = false
    newWindow = null;
  });
}

app.commandLine.appendSwitch("ignore-certificate-errors");

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  app.quit();
  // }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
      win.show();
    }
  });

  app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      // Devtools extensions are broken in Electron 6.0.0 and greater
      // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
      // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
      // If you are not using Windows 10 dark mode, you may uncomment these lines
      // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
      try {
        await installExtension(VUEJS_DEVTOOLS);
      } catch (e) {
        console.error("Vue Devtools failed to install:", e.toString());
      }
      const {
        globalShortcut
      } = require("electron");
      globalShortcut.register("Ctrl+A", function () {
        win.webContents.openDevTools();
      });
    }
    createWindow();
  });
}

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}