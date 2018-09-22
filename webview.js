const { webFrame } = require("electron")
webFrame.registerURLSchemeAsPrivileged("bug", {
  bypassCSP: false,
  allowServiceWorkers: true,
  supportFetchAPI: true,
  corsEnabled: true,
  secure: true
})
