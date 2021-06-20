# Comrade Webflow

### CDN:

---

```HTML
<script src="https://unpkg.com/comrade-webflow/dist/comrade-webflow.js"></script>
```

> Important: use in `<head>` crossite if you want to use libraries inside symbols

## Styles

---

`style` will be loaded if have `trigger` element on page

```JS
CWF.register({
  // multiple selectors: '.hero, .hero-inner'
  trigger: '.swiper-container',
  type: 'style',
  alias: 'swiper',
  url: 'https://unpkg.com/swiper/swiper-bundle.min.js'
})
```

> not fill `trigger` if you want to always load style

## JS Libraries

---

```js
CWF.register({
  type: 'script',
  alias: 'swiper',
  url: 'https://unpkg.com/swiper/swiper-bundle.min.js'
})
```

`script` will loaded on request and run callback function

```js
CWF.use('swiper', function () {
  new Swiper('.foo', {
    //...
  })
})
```

> if the library is already loaded immediately execute a callback

### jQuery ready callback

---

```js
CWF.$ready(function () {
  // some code with jquery
  $('body').html('<strong> ) </strong>')
})
```

> code will be executed only after jquery is loaded, can be used inside the symbol in the `embed code`

# Dispatcher

```js
function changeMenuStateCallback(state) {
  document.getElementById('menu').dataset.state = state
}

// add event listener
CWF.on('change-menu-state', changeMenuStateCallback)

// fire event with data
CWF.emit('change-menu-state', 'open')
CWF.emit('change-menu-state', 'closed')

// remove event listener
CWF.off('change-menu-state', changeMenuStateCallback)
```

# Schema

## General

#### HTML

```js
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
    }
  }
)
```

```html
<section>
  <div class="review-item">
    <div class="review-author">Michael Smith</div>
    <div class="review-body">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </div>
    <div class="review-rating">5</div>
  </div>
  <div class="review-item">
    <div class="review-author">Joe Smith</div>
    <div class="review-body">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </div>
    <div class="review-rating">4.5</div>
  </div>
</section>
```

> if reviews are not found on the page, then they will not go to schema

#### Result in `<head>`

```html
<script type="application/ld+json" id="root-Schema">
  {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": "http://davessteakhouse.example.com",
    "name": "Dave's Steak House",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "148 W 51st St",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10019",
      "addressCountry": "US"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Michael Smith" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "reviewBody": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Joe Smith" },
        "reviewRating": { "@type": "Rating", "ratingValue": "4.5" },
        "reviewBody": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.75,
      "reviewCount": 2
    }
  }
</script>
```

## Breadcrumbs

#### HTML

```html
<section>
  <a class="breadcrumb-item" href="/">Home</a>
  <a class="breadcrumb-item" href="/blog">Blog</a>
  <span class="breadcrumb-item">Blog inner</span>
</section>
```

#### JS

```js
CWF.specialSchema({ type: 'breadcrumbs', rootSelector: '.breadcrumb-item' })
```

#### Result in `<head>`

```html
<script type="application/ld+json" id="BreadcrumbList">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 0,
        "name": "Home",
        "item": "http://webflow.site/"
      },
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Blog",
        "item": "http://webflow.site/blog"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog inner"
      }
    ]
  }
</script>
```

## FAQ

#### HTML

```html
<section>
  <div class="faq-item">
    <div class="faq-question">Question 1</div>
    <div class="faq-answer">Answer 1</div>
  </div>
  <div class="faq-item">
    <div class="faq-question">Question 2</div>
    <div class="faq-answer">Answer 2</div>
  </div>
</section>
```

#### JS

```js
CWF.specialSchema({
  type: 'faq',
  rootSelector: '.faq-item',
  questionSelector: '.faq-question',
  answerSelector: '.faq-answer'
})
```

#### Result in `<head>`

```html
<script type="application/ld+json" id="FAQPage">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Question 1",
        "acceptedAnswer": { "@type": "Answer", "text": "Answer 1" }
      },
      {
        "@type": "Question",
        "name": "Question 2",
        "acceptedAnswer": { "@type": "Answer", "text": "Answer 2" }
      }
    ]
  }
</script>
```
