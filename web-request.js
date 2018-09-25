const { app, session } = require("electron")

exports.setup = () => {
  app.on("ready", exports.register)
}

exports.register = () => {
  const filter = {
    urls: ["bug://*"]
  }

  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      console.log(
        "session.defaultSession.webRequest.onBeforeSendHeaders",
        details
      )

      details.requestHeaders["X-Web-Request-BEFORE-SEND-ID"] = String(
        details.id
      )
      details.requestHeaders["X-Web-Request-BEFORE-SEND-URL"] = String(
        details.url
      )
      details.requestHeaders["X-Web-Request-BEFORE-SEND-Method"] =
        details.method
      details.requestHeaders[
        "X-Web-Request-BEFORE-SEND-Web-Content-ID"
      ] = String(details.webContentsId)
      details.requestHeaders[
        "X-Web-Request-BEFORE-SEND-Resource-Type"
      ] = String(details.resourceType)

      callback({ cancel: false, requestHeaders: details.requestHeaders })
    }
  )
}
