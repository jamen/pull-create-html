
var { pull, once, collect } = require('pull-stream')
var concat = require('pull-concat-files')
var cat = require('pull-cat')
var { extname } = require('path')
var h = require('h2ml')

module.exports = html

function html (path, options) {
  // fix html(options) usage
  if (!options) {
    options = path
    path = null
  }

  // Set defaults
  options = Object.assign({
    lang: 'en-US',
    title: '',
    charset: 'utf-8',
    description: '',
    body: '',
    keywords: '',
    base: null
  }, options)
  
  // Turn array of keywords into string
  if (Array.isArray(options.keywords)) {
    options.keywords = options.keywords
  }

  // Create empty streams if CSS/JS not specified
  if (!options.js) options.js = once(null)
  if (!options.css) options.css = once(null)

  // Setup output file path
  var base = options.base
  if (!path && options.path) {
    path = options.path
  }

  var sending, sent = false
  return function (end, cb) {
    if (end) return cb(end)
    if (!sending) {
      sending = true
      pull(
        cat([
          options.js,
          options.css
        ]),
        collect(function (err, files) {
          if (err) return cb(err)
          if (!sent) {
            // Create HTML
            var js = files[0] ? files[0].data.toString('utf8') : null
            var css = files[1] ? files[1].data.toString('utf8') : null
            var data = Buffer.from(
              '<!DOCTYPE html> ' +
              h('html', { lang: options.lang }, [
                h('head', [
                  h('title', options.title),
                  h('meta', { charset: options.charset }),
                  h('meta', { name: 'description', content: options.description }),
                  h('meta', { name: 'keywords', content: options.keywords }),
                  h('style', css),
                  options.scriptAsync ? h('script', { 'async': true }, js) : null
                ]),
                h('body', [ options.body, !options.scriptAsync ? h('script', js) : null ])
              ])
            )

            // Send file
            sent = true
            sending = false
            cb(null, { base, path, data })
            cb(true)
          }
        })
      ) 

    }
  }
}
