import CWF from '../index'

CWF.register({
  type: 'script',
  alias: 'comrade-forms',
  url: 'https://unpkg.com/comrade-forms/dist/comrade-forms.js'
})

CWF.register({
  trigger: 'body',
  type: 'style',
  alias: 'comrade-forms',
  url: 'https://unpkg.com/comrade-forms/dist/comrade-forms.css'
})

CWF.use('comrade-forms', function () {
  console.log('COMRADE-FORMS READY')
})

CWF.$ready(function () {
  console.log('ready work')
})

CWF.schema({ type: 'breadcrumbs', selector: '.breadcrumb-item' })
