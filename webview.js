const { webFrame } = require("electron")
webFrame.registerURLSchemeAsPrivileged("bug", { bypassCSP: false })
