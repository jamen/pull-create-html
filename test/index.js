
const test = require('tape')
const pull = require('pull-stream')
const { drain } = pull
const html = require('../')
const { read } = require('pull-files')

test('bundles html', t => {
  t.plan(2)

  pull(
    html('foo.html', {
      title: 'testing',
      js: read(__dirname + '/foo.js'),
      css: read(__dirname + '/foo.css')
    }),
    drain(file => {
      t.is(file.path, 'foo.html', 'got html file')

    }, t.false)
  )
})

test('script async', t => {
  t.plan(3)

  pull(
    html('foo.html', {
      js: read(__dirname + '/foo.js'),
      scriptAsync: true
    }),
    drain(file => {
      const html = file.data.toString()
      t.assert(html.indexOf('async="true"') > -1, 'script has async attribute')
      t.assert(html.indexOf('async="true"') < html.indexOf('</head>'), 'script is before closing head tag')
    }, t.false)
  )
})


