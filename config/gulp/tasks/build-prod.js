const { build } = require('../setup')

module.exports = (gulp) => {
  /* eslint global-require: 0 */
  const name = 'build-prod'
  const taskAssets = require('./assets')(gulp)
  const taskAssetsProd = require('./assets-prod')(gulp)

  gulp.task(name, gulp.series(build,
    process.env.patternlab ? taskAssets : taskAssetsProd, (done) => {
      done()
    })
  )

  return name
}
