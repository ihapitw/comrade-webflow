import { ComradeWebflowSchema } from '../modules/schema'

export class SchemaBreadCrumbs extends ComradeWebflowSchema {
  constructor(itemSelector) {
    super(itemSelector)

    this.type = 'BreadcrumbList'
    this.itemsField = 'itemListElement'
    this.setMeta()
    this.setElements()
  }
  renderAtom(element, index) {
    const atom = {
      '@type': 'ListItem',
      position: index,
      name: element.textContent,
      item: element.href || false
    }
    if (atom.item === false) {
      delete atom.item
    }
    return atom
  }
}
