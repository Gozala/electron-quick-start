window.onclick = () => {
  const webview = document.querySelector("#host")
  if (webview.isLoading()) {
    webview.addEventListener("dom-ready", () => {
      webview.openDevTools()
    })
  } else {
    webview.openDevTools()
  }
}

document.querySelector("#main").addEventListener("new-window", event => {
  // event.preventDefault()
  // event.stopPropagation()
  // const tab = event.target.cloneNode(false)
  // tab.src = "about:blank"
  // event.target.parentElement.insertBefore(tab, event.target)
  // tab.loadURL(event.url)
  // event.newGuest = tab.getWebContents()
  // console.log(event)
  const webView = document.querySelector("#host")
  webView.webpreferences = encodeWebPreferences(
    event.options.webpreferences || {}
  )
  webView.src = event.url
})

const encodeWebPreferences = prefs =>
  Object.entries(event.options.webPreferences)
    .filter(([key, value]) => value !== "")
    .map(
      ([key, value]) =>
        typeof value === "boolean"
          ? `${key}=${value ? "yes" : "no"}`
          : `${key}=${value}`
    )
    .join(", ")
