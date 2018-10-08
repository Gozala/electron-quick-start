const handler = {
  handleEvent(event) {
    switch (event.target.id) {
      case "open-button": {
        window.host = window.open("./host.html", "tab")
        document.querySelector("#log").textContent += `\nOpened window: ${
          window.host
        }`
        return
      }
      case "update-host": {
        host.document.body.innerHTML = "<h1>Updated doc</h1>"
        document.querySelector("#log").textContent += `\nUpdated host doc: ${
          host.document.body.innerHTML
        }`
        return
      }
    }
  }
}

document.addEventListener("click", handler)
