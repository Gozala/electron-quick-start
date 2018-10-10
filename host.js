window.onmessage = event => {
  document.querySelector("#log").textContent += `\nGot message ${event.data}`
  event.source.postMessage("pong", "*")
}

document.querySelector("#log").textContent += `\nWindow opener: ${
  window.opener
}`
