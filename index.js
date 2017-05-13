
const cheerio = require('cheerio')
const { extname } = require('path')

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
    return Buffer.from(cheerio.load(`
      <!DOCTYPE html>
      <html lang='${lang}'>
        <head>
          <title>${title}</title>
          <meta charset='${charset}'>
          <meta name='description' content="${description}">
          <meta name='keywords' content='${keywords}'>
          <style>${Buffer.concat(css).toString('utf8')}</style>
        </head>
        <body>
          ${body}
          <script>${Buffer.concat(js).toString('utf8')}</script>
        </body>
      </html>
    `, { normalizeWhitespace: true }).html())
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

