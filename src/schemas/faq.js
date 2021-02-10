import { CWFSchema } from '../modules/schema'

export class CWFSchemaFAQ extends CWFSchema {
  constructor(itemSelector, questionSelector, answerSelector) {
    super(itemSelector)

    this.type = 'FAQPage'
    this.itemsField = 'mainEntity'

    this.questionSelector = questionSelector
    this.answerSelector = answerSelector
    this.setMeta()
    this.setElements()
  }

  renderAtom(element) {
    return {
      '@type': 'Question',
      name: element.querySelector(this.questionSelector).textContent,
      acceptedAnswer: {
        '@type': 'Answer',
        text: element.querySelector(this.answerSelector).textContent
      }
    }
  }
}
