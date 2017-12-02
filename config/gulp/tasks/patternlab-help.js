const { patternlab } = require('../setup')

module.exports = (gulp) => {
  const name = 'patternlab:help'

  gulp.task(name, (done) => {
    patternlab.help()
    done()
  })

  return name
}
