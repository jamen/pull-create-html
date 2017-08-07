
# pull-create-html

> Create an html file from js and css file streams

A stream that produces a [html pull-stream file](https://github.com/jamen/pull-files) with optional settings such as a title, various meta options, js and css content streams, and a body, etc.

```js
var pull = require('pull-stream')
var pair = require('pull-pair')
var { read, write } = require('pull-files')
var bundle = require('pull-bundle-js')
var html = require('pull-create-html')

// Content streams
var css = pair()
var js = pair()

// Create js files (bundle & minify)
pull(
  read(__dirname + '/lib/index.js'),
  bundle([ ...transforms ]),
  minify(),
  js.sink
)

// Create css files (sass & minify)
pull(
  read(__dirname + '/style/**/*.sass'),
  sass(),
  minify(),
  css.sink
)

// Create html from meta options + the js and css file streams
pull(
  html('foo.html', {
    // Meta options
    title: 'foo',
    description: 'Foo bar baz ...',
    body: '<div clas="app"></div>',
    // File streams
    js,
    css 
  }),
  write(__dirname + '/out', err => {
    // Finished
  })
)
```

## Install

```sh
npm i pull-create-html
```

## Usage

### `html(path?, options)`

Creates an html file from js and css file streams, with several options configure the boilerplate html.

 - `js` a stream of js files which put in `<script>`
 - `css` a stream of css files which get put in `<style>`
 - `lang` sets the `<html lang=...>` attribute.  Defaults to `en-US`
 - `title` sets the `<title>...</title>` element
 - `body` is a string of HTML to put before where the JS is injected.  e.g. a mount element for vdom
 - `charset` sets the `<meta charset=...>` element.  Defaults to `utf-8`
 - `description` sets the `<meta name='description'>` element
 - `keywords` sets the `<meta name='keywords'>` element
 - `base` sets the `file.base` on the output HTML file
 - `scriptAsync` lets the JS files load async by setting `<script async="true">` in the `<head>`
 - `links` Lets you specify `<link {...data}>` in the `<head>` as objects (see below)

Files in the js/css stream are [concatenated together](https://github.com/jamen/pull-concat-files).  Allows streaming a directory of plain css files, for example.

```js
pull(
  html('app.html', {
    title: '',
    description: 'My website'
    // Others...
  
    js: pull(
      read(__dirname + '/lib/index.js'),
      bundle([ ...transforms ])
    ),

    css: pull(
      read(__dirname + '/style/index.sass'),
      sass()
    )
  }),
  write(__dirname + '/out', err => {
    // Finished
  })
)
```

For using `options.links`, you specify a list of objects:

```js
links: [
  { href: 'foo.css', type: 'text/css', rel: 'stylesheet' }
  // ...
]
```

# Also see

 - [`pull-files`](https://github.com/jamen/pull-files)
 - [`pull-bundle-js`](https://github.com/jamen/pull-bundle-js)
 - [`pull-minify-js`](https://github.com/jamen/pull-minify-js)
 - [`pull-concat-files`](https://github.com/jamen/pull-concat-files)
 - [`pull-minify-css`](https://github.com/jamen/pull-minify-css)
 - [`pull-pair`](https://github.com/pull-stream/pull-pair)

---

Maintained by [Jamen Marz](https://git.io/jamen) (See on [Twitter](https://twitter.com/jamenmarz) and [GitHub](https://github.com/jamen) for questions & updates)

