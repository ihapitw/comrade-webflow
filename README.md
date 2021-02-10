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

# Schema

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
CWF.schema({ type: 'breadcrumbs', selector: '.breadcrumb-item' })
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
CWF.schema({
  type: 'faq',
  selector: '.faq-item',
  faq: {
    questionSelector: '.faq-question',
    answerSelector: '.faq-answer'
  }
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
