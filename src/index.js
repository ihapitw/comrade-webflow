let instance = null

import { ComradeWebflowLibrary } from './modules/library'
import { ComradeWebflowRootSchema } from './schemas/root'
import { SchemaFAQ } from './schemas/faq'
import { SchemaBreadCrumbs } from './schemas/breadcrumbs'
import { jqueryWatcher } from './utils/jquery-ready-watcher'
import { ComradeWebflowDispatcher } from './modules/dispatcher'

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

    this.createDispatcher()

    console.log(`Comrade Webflow ${APP_VERSION}`)
  }

  createDispatcher() {
    const dispatcher = new ComradeWebflowDispatcher()
    this.on = dispatcher.addListener.bind(dispatcher)
    this.off = dispatcher.removeListener.bind(dispatcher)
    this.emit = dispatcher.dispatch.bind(dispatcher)
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
      this.libraries[type][alias] = new ComradeWebflowLibrary({
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
  rootSchema(content, payload) {
    this.schemas.root = new ComradeWebflowRootSchema(content, payload)
  }
  specialSchema({
    type,
    rootSelector = '',
    questionSelector = '',
    answerSelector = ''
  }) {
    if (type === 'breadcrumbs') {
      this.schemas.breadcrumbs = new SchemaBreadCrumbs(rootSelector)
    }
    if (type === 'faq') {
      this.schemas.faq = new SchemaFAQ(
        rootSelector,
        questionSelector,
        answerSelector
      )
    }
  }
}
