import { createSchema } from '../utils/create-content'

export class CWFSchema {
  constructor(itemSelector) {
    this.selector = itemSelector
    this.items = document.querySelectorAll(this.selector)
    this.type = ''
    this.itemsField = ''
    this.template = {
      '@context': 'https://schema.org',
      '@type': ''
    }
    this.elementTemplate = {}
  }

  setMeta() {
    this.template['@type'] = this.type
    this.template[this.itemsField] = []
  }

  setElements() {}

  print() {
    createSchema(this.type, this.template)
  }
}
