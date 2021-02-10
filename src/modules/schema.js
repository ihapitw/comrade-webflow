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
  }

  setMeta() {
    this.template['@type'] = this.type
    this.template[this.itemsField] = []
  }
  renderAtom() {
    return 'empty'
  }
  setElements() {
    this.template[this.itemsField] = []
    this.items.forEach((element, index) => {
      this.template[this.itemsField].push(this.renderAtom(element, index))
    })
    this.print()
  }

  print() {
    createSchema(this.type, this.template)
  }
}
