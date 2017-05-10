
const test = require('tape')
const pull = require('pull-stream')
const { values, drain } = pull
const html = require('../')

test('bundles html', t => {
  t.plan(2)

  pull(
    values([
      { path: 'foo.js', data: Buffer.from('console.log(test)') },
      { path: 'foo.css', data: Buffer.from('html, body { margin: 0 }') }
    ]),
    html('foo.js', { title: 'testing' }),
    drain(file => {
      t.true(file, 'got file')
      console.log(file)
      console.log(file.data.toString())
    }, t.false)
  )
})


