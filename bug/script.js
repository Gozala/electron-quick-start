window.onclick = async ({ target }) => {
  const output = document.querySelector("#output")
  output.textContent = `Exectuing ${target.getAttribute("data-case")}\n`
  switch (target.getAttribute("data-case")) {
    case "xhr-string": {
      const result = await writeFile("./text/echo", "hello there string")
      output.textContent += await formatResult(result)
      break
    }
    case "xhr-binary": {
      const encoder = new TextEncoder()
      const buffer = encoder.encode("hello there binary")
      const result = await writeFile("./binary/echo", buffer)
      output.textContent += await formatResult(result)
      break
    }
    case "xhr-blob": {
      const blob = new Blob(["hello there blob"], { type: "text/plain" })
      const result = await writeFile("./blob/echo", blob)
      output.textContent += await formatResult(result)
      break
    }
    case "xhr-form": {
      const formData = new FormData()
      formData.append("username", "form")
      formData.append("accountnum", 123456)
      const blob = new Blob(["<b>hello there form</b>"], { type: "text/html" })
      formData.append("data.html", blob)
      const result = await writeFile("./form/echo", formData)
      output.textContent += await formatResult(result)
      break
    }
    case "put-fetch": {
      const result = await fetch("./put-fetch/echo", {
        method: "PUT",
        body: "Hi there fetch API"
      })
      output.textContent += await formatResult(result)
      break
    }
    case "post-fetch": {
      const result = await fetch("./post-fetch/echo", {
        method: "POST",
        body: "Hi there fetch API"
      })
      output.textContent += await formatResult(result)
      break
    }
    case "cors-fetch": {
      const result = await fetch("bug://corst/fetch/echo", {
        method: "PUT",
        body: "Hi there CORS fetch API"
      })
      output.textContent += await formatResult(result)
      break
    }
    default: {
    }
  }
}

var writeFile = (url, data) =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open("PUT", url, true)
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8")
    request.onerror = () => resolve(request)
    request.onloadend = () => resolve(request)
    request.send(data)
  })

var formatResult = async result => `
------
status: ${result.status}
statusText: ${result.statusText}
body:
${result.text ? await result.text() : result.responseText}
------
`
