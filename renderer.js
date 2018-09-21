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
