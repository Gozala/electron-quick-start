const handler = {
  handleEvent(event) {
    if (event.target.id === "open-button") {
      let host = window.open("./host.html", "modal")
    }
  }
}

document.addEventListener("click", handler)
