const openDevTools = webview => {
  if (webview.isLoading()) {
    webview.addEventListener("dom-ready", () => {
      webview.openDevTools()
    })
  } else {
    webview.openDevTools()
  }
}

window.onclick = () => {
  openDevTools(document.querySelector("#opener"))
  openDevTools(document.querySelector("#opened"))
}

document.querySelector("#opener").addEventListener("new-window", event => {
  // event.preventDefault()
  // event.stopPropagation()
  // const tab = event.target.cloneNode(false)
  // tab.src = "about:blank"
  // event.target.parentElement.insertBefore(tab, event.target)
  // tab.loadURL(event.url)
  // event.newGuest = tab.getWebContents()
  // console.log(event)
  const webView = document.querySelector("#opened")
  webView.webpreferences = encodeWebPreferences(
    event.options.webPreferences || {}
  )
  webView.src = event.url
})

const encodeWebPreferences = prefs =>
  Object.entries(prefs)
    .filter(([key, value]) => value !== "")
    .map(
      ([key, value]) =>
        typeof value === "boolean"
          ? `${key}=${value ? "yes" : "no"}`
          : `${key}=${value}`
    )
    .join(", ")
