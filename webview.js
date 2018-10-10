const handler = {
  handleEvent(event) {
    switch (event.type) {
      case "click": {
        switch (event.target.id) {
          case "open-button": {
            window.host = window.open("./host.html", "tab")
            document.querySelector("#log").textContent += `\nWindow opened: ${
              window.host
            }`
            return
          }
          case "ping-host": {
            document.querySelector(
              "#log"
            ).textContent += `\nPinged host doc: ${host.postMessage(
              "ping",
              "*"
            )}`
            return
          }
          case "close-host": {
            document.querySelector(
              "#log"
            ).textContent += `\nPinged host doc: ${host.close()}`
            return
          }
        }
        return
      }
      case "message": {
        document.querySelector("#log").textContent += `\nReceived message: ${
          event.data
        }`
        return
      }
    }
  }
}

window.addEventListener("message", handler)

document.addEventListener("click", handler)
