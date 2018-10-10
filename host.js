window.onmessage = event => {
  document.querySelector("#log").textContent += `\nGot message ${event.data}`
}

document.querySelector("#log").textContent += `\nWindow opener: ${
  window.opener
}`
