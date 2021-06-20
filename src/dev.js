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

CWF.rootSchema(
  {
    '@type': 'Restaurant',
    '@id': 'http://davessteakhouse.example.com',
    name: "Dave's Steak House",
    address: {
      '@type': 'PostalAddress',
      streetAddress: '148 W 51st St',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10019',
      addressCountry: 'US'
    }
  },
  {
    reviews: {
      itemSelector: '.review-item',
      authorSelector: '.review-author',
      bodySelector: '.review-body',
      ratingSelector: '.review-rating'
    },
    aggregateRating: {
      ratingValue: '4.8',
      reviewCount: '250'
    }
  }
)

CWF.specialSchema({ type: 'breadcrumbs', rootSelector: '.breadcrumb-item' })
CWF.specialSchema({
  type: 'faq',
  rootSelector: '.our-rel-proc__faq-item',
  questionSelector: '.item-name__h3',
  answerSelector: '.faq-item-body'
})

function changeMenuStateCallback(state) {
  // document.getElementById('menu').dataset.state = state
  console.log(state)
}

// add event listener
CWF.on('change-menu-state', changeMenuStateCallback)

// fire event with data
CWF.emit('change-menu-state', 'open')
CWF.emit('change-menu-state', 'closed')

// remove event listener
CWF.off('change-menu-state', changeMenuStateCallback)
