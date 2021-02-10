let instance = null

import { CWFLibrary } from './modules/library'
import { CWFSchemaBreadCrumbs } from './schemas/breadcrumbs'
import { CWFSchemaFAQ } from './schemas/faq'
import { jqueryWatcher } from './utils/jquery-ready-watcher'

export class ComradeWebflow {
  constructor() {
    if (instance) {
      return instance
    }
    this.schemas = {}
    this.libraries = {
      script: {},
      style: {}
    }

    console.log(`Comrade Webflow ${APP_VERSION}`)
  }

  register({ type, url, alias, trigger }) {
    if (alias === undefined) {
      throw new Error(`CWF: alias cannot be empty`)
    }
    if (url === undefined) {
      throw new Error(`CWF: url cannot be empty`)
    }
    if (type === undefined) {
      throw new Error(`CWF: type cannot be empty`)
    } else if (!(type === 'script' || type === 'style')) {
      throw new TypeError(
        `CWF: type '${type}' is not correct, please use 'script' or 'style'`
      )
    }
    if (this.libraries[type].hasOwnProperty(alias)) {
      console.warn(`CWF: alias ${alias} with type ${type} already used`)
    } else {
      this.libraries[type][alias] = new CWFLibrary({
        type,
        url,
        alias,
        trigger
      })
    }
  }

  use(alias, callback) {
    if (this.libraries.script.hasOwnProperty(alias)) {
      const library = this.libraries.script[alias]
      if (library.loaded) {
        callback()
      } else {
        library.load().then(callback)
      }
    } else {
      console.error(`CWF: library ${alias} not registered`)
    }
  }

  $ready(callback) {
    jqueryWatcher().then(callback)
  }

  schema({
    type,
    selector,
    faq = {
      questionSelector: '',
      answerSelector: ''
    }
  }) {
    if (type === 'breadcrumbs') {
      this.schemas.breadcrumbs = new CWFSchemaBreadCrumbs(selector)
      console.log(this.schemas.breadcrumbs)
    }
    if (type === 'faq') {
      this.schemas.faq = new CWFSchemaFAQ(
        selector,
        faq.questionSelector,
        faq.answerSelector
      )
      console.log(this.schemas.faq)
    }
  }
}
