
# pull-create-html

> Create an html file from js and css file streams

A stream that produces a [html pull-stream file](https://github.com/jamen/pull-files) with optional settings such as a title, various meta options, js and css content streams, and a body, etc.

```js
var pull = require('pull-stream')
var { read, write } = require('pull-files')
var bundle = require('pull-bundle-js')
var html = require('pull-create-html')

var js = pull(
  read(__dirname + '/lib/index.js'),
  bundle([ ...transforms ])
)

var css = pull(
  read(__dirname + '/style/**/*.sass'),
  sass()
)

// Create html from meta options + the js and css file streams
pull(
  html('foo.html', {
    // Meta options
    title: 'foo',
    body: '<div clas="app"></div>',
    meta: [
      { name: 'description', content: 'Example' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=0' }
    ]
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
 - `base` sets the `file.base` on the output HTML file
 - `scriptAsync` lets the JS files load async by setting `<script async="true">` in the `<head>`
 - `links` Lets you specify `<link>` as a list of objects
 - `meta` Lets you specify `<meta>` as a list of objects

Files in the js/css stream are [concatenated together](https://github.com/jamen/pull-concat-files).  Allows streaming a directory of plain css files, for example.

```js
pull(
  html('app.html', {
    title: 'Example site',
     
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

Likewise with `options.meta`:

```js
meta: [
  { name: 'description', content: 'Foo bar baz!' },
  { name: 'keywords', content: 'example, test, foo, bar' },
  // ...
]
```

# Also see

 - [`pull-files`](https://github.com/jamen/pull-files)
 - [`pull-bundle-js`](https://github.com/jamen/pull-bundle-js)
 - [`pull-minify-js`](https://github.com/jamen/pull-minify-js)
 - [`pull-concat-files`](https://github.com/jamen/pull-concat-files)
 - [`pull-minify-css`](https://github.com/jamen/pull-minify-css)

---

Maintained by [Jamen Marz](https://git.io/jamen) (See on [Twitter](https://twitter.com/jamenmarz) and [GitHub](https://github.com/jamen) for questions & updates)

