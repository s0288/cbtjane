const { patternlab, getConfiguredCleanOption } = require('../setup')

module.exports = (gulp) => {
  const name = 'patternlab:patternsonly'

  gulp.task(name, (done) => {
    patternlab.patternsonly(done, getConfiguredCleanOption())
  })

  return name
}
