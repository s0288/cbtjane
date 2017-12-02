const { build } = require('../setup')


module.exports = (gulp) => {
  /* eslint global-require: 0 */
  const taskPlAssets = require('./assets')(gulp)

  const name = 'patternlab:build'

  gulp.task(name, gulp.series(build, taskPlAssets, (done) => {
    done()
  }))

  return name
}
