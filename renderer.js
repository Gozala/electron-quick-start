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
  event.stopPropagation()
  const tab = event.target.cloneNode(false)
  tab.src = "about:blank"
  event.target.parentElement.insertBefore(tab, event.target)
  tab.loadURL(event.url)
  event.newGuest = tab.getWebContents()
  console.log(event)
})
