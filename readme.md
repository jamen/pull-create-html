
# pull-bundle-html

> Bundle JS and CSS into boilerplate HTML

```js
const pull = require('pull-stream')
const { read, write } = require('pull-files')
const bundle = require('pull-bundle')
const html = require('pull-bundle-html')

pull(
  read([ 'index.js', 'index.css' ]),
  bundle([ 'esfp' ]),
  html('app.html', { ...options }),
  write('out', err => {
    // done
  })
)
```

Also look at [`pull-bundle`](https://github.com/jamen/pull-bundle) to Browserify the JavaScript.

## Install

```sh
npm install --save pull-bundle-html
```

```sh
yarn add pull-bundle-html
```

## Usage

### `html(path?, settings)``

Takes JS and CSS files out of the stream, and bundles them into boilerplate HTML with your settings

 - `pass` to let non-JS/CSS files pass through.  Defaults to `true`
 - `lang` sets the `<html lang=...>` attribute.  Defaults to `en-US`
 - `title` sets the `<title>...</title>` element
 - `body` is a string of HTML to put before where the JS is injected.  e.g. a mount element for vdom
 - `charset` sets the `<meta charset=...>` element.  Defaults to `utf-8`
 - `description` sets the `<meta name='description'>` element
 - `keywords` sets the `<meta name='keywords'>` element
 - `base` sets the `file.base` on the output HTML file

---

Maintained by [Jamen Marz](https://git.io/jamen) (See on [Twitter](https://twitter.com/jamenmarz) and [GitHub](https://github.com/jamen) for questions & updates)

