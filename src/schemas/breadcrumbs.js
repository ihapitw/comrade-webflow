import { CWFSchema } from '../modules/schema'

export class CWFBreadCrumbs extends CWFSchema {
  constructor(itemSelector) {
    super(itemSelector)

    this.type = 'BreadcrumbList'
    this.itemsField = 'itemListElement'
    this.setMeta()
    this.setElements()
  }

  setElements() {
    this.items.forEach((element, index) => {
      const atom = {
        '@type': 'ListItem',
        position: index,
        name: element.textContent,
        item: element.href || false
      }
      if (atom.item === false) {
        delete atom.item
      }
      this.template[this.itemsField].push(atom)
    })

    this.print()
  }
}
