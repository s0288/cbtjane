const loaderUtils = require('loader-utils')
const util = require('util')
const fs = require('fs')
const mustache = require('mustache')
const async = require('async')
const path = require('path')

function loadFileContent(file, callback) {
  const fullFilePath = `${file}.mustache`
  fs.exists(fullFilePath, (fileExists) => {
    if (fileExists) {
      fs.readFile(fullFilePath, (err, data) => {
        if (!err) {
          callback(null, data.toString())
        } else {
          callback(err)
        }
      })
    } else {
      callback(util.format("'%s' not found", file))
    }
  })
}

const render = (templateHtml, partials, view) => {
  partials = partials || {}
  try {
    let html
    const replaceMustache = /\{\{[ ]*>[ ]*body[ ]*\}\}/
    const keyReplace = 'tmpBodyHightTest'
    html = templateHtml.replace(replaceMustache, keyReplace)
    html = mustache.render(html, view, partials)
    html = html.replace(keyReplace, partials.body)
    // TODO
    return html
  } catch (err) {
    return {
      err
    }
  }
}

const loadPartials = options => (strData, partials, callback) => {
  /* eslint no-cond-assign: 0 */
  /* eslint no-use-before-define: 0 */
  const tasks = []
  const partialsRegex = /{{\s*>\s*([\w/\-_$]+)\s*}}/g
  let r
  while ((r = partialsRegex.exec(strData)) != null) {
    tasks.push(
      collectFileContent(partials, r[1], options)
    )
  }

  tasks.push((cb) => {
    cb('end')
    callback()
  })

  async.series(tasks)
}

const collectFileContent = (partials, partialsName, options) => (cb) => {
  const { origin } = options
  const pathOfView = path.join(origin, partialsName)
  loadFileContent(pathOfView, (err, data) => {
    /* eslint no-param-reassign: 0 */
    if (err) {
      partials[partialsName] = err
      cb()
    } else {
      partials[partialsName] = data

      loadPartials(options)(data, partials, () => {
        cb(null, partialsName)
      })
    }
  })
}

function jsFriendlyJSONStringify(s) {
  return JSON.stringify(s)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

const loadFile = (pathview, options, cb) => {
  fs.exists(pathview, () => {
    fs.readFile(pathview, (err, data) => {
      const htmlData = data.toString()
      const nested = { body: htmlData }
      loadPartials(options)(htmlData, nested, () => {
        cb(null, `
          var mustache = require("mustache")

          module.exports = {
            render: function() {
              var M = ${render}
              return M.apply(null, ['${htmlData.replace(/(\r\n|\n|\r)/gm, '')}', ${jsFriendlyJSONStringify(nested)}, arguments[0]])
            }
          }
        `)
      })
    })
  })
}

module.exports = function initiateLoader() {
  const callback = this.async()
  const options = loaderUtils.getOptions(this)
  options.origin = path.join(__dirname, '../../', options.origin)
  const pathview = this.resourcePath

  loadFile(pathview, options, callback)
}
