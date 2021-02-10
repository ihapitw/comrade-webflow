export function createStyle(url) {
  const element = document.createElement('link')
  element.type = 'text/css'
  element.rel = 'stylesheet'
  element.href = url
  const x = document.getElementsByTagName('head')[0]
  x.appendChild(element)
  return element
}

export function createScript(url) {
  const element = document.createElement('script')
  element.type = 'text/javascript'
  element.async = true
  element.src = url
  const x = document.body
  x.appendChild(element)
  return element
}

export function createSchema(type, content) {
  let element = document.getElementById(`${type}-Schema`)
  if (element) {
    element.innerHTML = JSON.stringify(content)
    return false
  }
  element = document.createElement('script')
  element.type = 'application/ld+json'
  element.innerHTML = JSON.stringify(content)
  element.id = `${type}-Schema`
  document.head.appendChild(element)
}
