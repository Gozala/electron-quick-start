const { protocol, app } = require("electron")
const { PassThrough } = require("stream")
const { createReadStream } = require("fs")
const path = require("path")

function createStream(text) {
  const stream = new PassThrough()
  setTimeout(() => {
    stream.push(text)
    stream.end()
  })
  return stream
}

exports.setup = () => {
  app.on("ready", exports.register)
  protocol.registerStandardSchemes(["bug"], {
    secure: true
  })
}

exports.register = () => {
  protocol.registerStreamProtocol("bug", exports.protocolHandler, error => {
    if (error) {
      console.error("Failed to register protocol")
    }
  })
}

exports.protocolHandler = (request, respond) => {
  if (request.url.endsWith("echo")) {
    respond({
      statusCode: 200,
      headers: {
        "content-type": "application/json"
      },
      data: createStream(
        JSON.stringify(
          {
            url: request.url,
            headers: request.headers,
            referrer: request.referrer,
            method: request.method,
            uploadData: request.uploadData == null ? null : request.uploadData
          },
          null,
          2
        )
      )
    })
  } else {
    const file = path.join(
      module.filename,
      "..",
      request.url.substr(request.url.indexOf("://") + 2)
    )

    respond({
      statusCode: 200,
      headers: {
        "content-type": file.endsWith(".html")
          ? "text/html"
          : file.endsWith(".js")
            ? "text/javascript"
            : "text/plain"
      },
      data: createReadStream(file)
    })
  }
}
