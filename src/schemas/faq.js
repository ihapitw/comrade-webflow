import { ComradeWebflowSchema } from '../modules/schema'

export class SchemaFAQ extends ComradeWebflowSchema {
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
    let question = element.querySelector(this.questionSelector)
    let answer = element.querySelector(this.answerSelector)
    question = question ? question.textContent : ''
    answer = answer ? answer.textContent : ''
    return {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }
  }
}
