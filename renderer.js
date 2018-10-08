window.onclick = () => {
  const webview = document.querySelector("webview")
  if (webview.isLoading()) {
    webview.addEventListener("dom-ready", () => {
      webview.openDevTools()
    })
  } else {
    webview.openDevTools()
  }
}

document.querySelector("webview").addEventListener("new-window", event => {
  event.preventDefault()
  const tab = event.target.cloneNode(false)
  tab.src = event.url
  event.target.parentElement.insertBefore(tab, event.target)
  event.newGuest = tab.getWebContents()
  console.log(event)
})
