import { createScript, createStyle } from '../utils/create-content'
export class CWFLibrary {
  constructor({ type, url, alias, trigger }) {
    this.alias = alias
    this.type = type
    this.url = url
    this.element = null
    this.loaded = false

    console.log(`CWF: ${this.alias} registered [${this.type}]`)
    if (this.type === 'style' && trigger && document.querySelector(trigger)) {
      this.load()
    } else if (this.type === 'style' && trigger) {
      console.log(`CWF: ${alias} style not load, ${trigger} not found on page`)
    }
  }
  createElement() {
    if (this.type === 'script') {
      this.element = createScript(this.url)
    } else if (this.type === 'style') {
      this.element = createStyle(this.url)
    }
    this.element.id = `cwf-${this.type}-${this.alias}`
  }
  load() {
    if (this.element && this.loaded) {
      return Promise.resolve()
    } else {
      if (!this.element) {
        this.createElement()
      }
      return new Promise((resolve) => {
        this.element.addEventListener('load', () => {
          this.loaded = true
          resolve()
        })
      })
    }
  }
}
