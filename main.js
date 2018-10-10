// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron")
const parseFeaturesString = require("./parse-features-string")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // nativeWindowOpen: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile("index.html")

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options, additionalFeatures) => {
      console.log(
        "!!!!!!!!!!!!!!",
        event,
        url,
        frameName,
        disposition,
        options,
        additionalFeatures
      )

      if (frameName === "tab") {
        event.preventDefault()
        const webView = document.createElement("webview")
        document.appendChild(webView)
        event.newGuest = BrowserWindow.fromWebContents(webView.getWebContents())
      }

      if (frameName === "modal") {
        // open window as modal
        event.preventDefault()
        Object.assign(options, {
          modal: true,
          parent: mainWindow,
          width: 100,
          height: 100
        })
        event.newGuest = new BrowserWindow(options)
      }
    }
  )

  setupWorkaround(mainWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

const setupWorkaround = mainWindow => {
  let newGuest = null

  mainWindow.webContents.on("did-attach-webview", (event, webContents) => {
    if (webContents.getLastWebPreferences().preallocateGuestHost) {
      newGuest = webContents
    }
  })

  ipcMain.removeAllListeners("ELECTRON_GUEST_WINDOW_MANAGER_WINDOW_OPEN")
  ipcMain.on(
    "ELECTRON_GUEST_WINDOW_MANAGER_WINDOW_OPEN",
    (event, url, frameName, features) => {
      if (url == null || url === "") url = "about:blank"
      if (frameName == null) frameName = ""
      if (features == null) features = ""

      const options = {}

      const ints = [
        "x",
        "y",
        "width",
        "height",
        "minWidth",
        "maxWidth",
        "minHeight",
        "maxHeight",
        "zoomFactor"
      ]
      const webPreferences = [
        "zoomFactor",
        "nodeIntegration",
        "preload",
        "javascript",
        "contextIsolation",
        "webviewTag"
      ]
      const disposition = "new-window"

      // Used to store additional features
      const additionalFeatures = []

      // Parse the features
      parseFeaturesString(features, function(key, value) {
        if (value === undefined) {
          additionalFeatures.push(key)
        } else {
          // Don't allow webPreferences to be set since it must be an object
          // that cannot be directly overridden
          if (key === "webPreferences") return

          if (webPreferences.includes(key)) {
            if (options.webPreferences == null) {
              options.webPreferences = {}
            }
            options.webPreferences[key] = value
          } else {
            options[key] = value
          }
        }
      })
      if (options.left) {
        if (options.x == null) {
          options.x = options.left
        }
      }
      if (options.top) {
        if (options.y == null) {
          options.y = options.top
        }
      }
      if (options.title == null) {
        options.title = frameName
      }
      if (options.width == null) {
        options.width = 800
      }
      if (options.height == null) {
        options.height = 600
      }

      for (const name of ints) {
        if (options[name] != null) {
          options[name] = parseInt(options[name], 10)
        }
      }

      const referrer = { url: "", policy: "default" }

      event.preventDefault()
      event.newGuest = newGuest

      ipcMain.emit(
        "ELECTRON_GUEST_WINDOW_MANAGER_INTERNAL_WINDOW_OPEN",
        event,
        url,
        referrer,
        frameName,
        disposition,
        options,
        additionalFeatures
      )
    }
  )
}
