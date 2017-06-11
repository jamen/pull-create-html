
const { extname } = require('path')
const h = require('hyperscript')

module.exports = html

function html (path, options) {
  if (typeof path === 'object') {
    options = path
    path = options.path
  }

  if (!options) options = {}
  
  const js = []
  const css = []
  let sent = false

  const base = options.base || null
  const pass = options.pass !== undefined ? options.pass : true
  const lang = options.lang || 'en-US'
  const title = options.title || ''
  const charset = options.charset || 'utf-8'
  const description = options.description || ''
  const body = options.body || ''
  const keywords = options.keywords
    ? options.keywords.join(', ')
    : ''


  function create () {
    const bufferedJS = Buffer.concat(js).toString('utf8')
    
    return Buffer.from(
      '<!DOCTYPE html> ' +
      h('html', { lang }, [
        h('head', [
          h('title', title),
          h('meta', { charset }),
          h('meta', { name: 'description', content: description }),
          h('meta', { name: 'keywords', content: keywords }),
          h('style', Buffer.concat(css).toString('utf8')),
          options.scriptAsync ? h('script', {'async': true}, bufferedJS) : ''
        ]),
        h('body', [
          body,
          !options.scriptAsync ? h('script', bufferedJS) : ''
        ])
      ]).outerHTML
    )
  }

  return function reader (read) {
    return function write (end, cb) {
      read(end, (end, file) => {
        if (!sent && end === true) {
          sent = true
          return cb(null, { base, path, data: create() })
        } else if (end) {
          return cb(end)
        }
        
        const ext = extname(file.path)
        if (ext === '.js') js.push(file.data)
        else if (ext === '.css') css.push(file.data)
        else if (oass) cb(null, file)
        if (!sent) write(null, cb)
      })
    }
  }
}

