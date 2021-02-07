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
