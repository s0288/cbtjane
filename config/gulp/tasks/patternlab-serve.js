

module.exports = (gulp) => {
  /* eslint global-require: 0 */
  const watcher = require('./watcher')(gulp)

  const taskPatternlabBuild = require('./patternlab-build')(gulp)
  const taskPatternlabConnect = require('./patternlab-connect')(gulp)
  const taskQrCode = require('./qrcode')(gulp)

  const name = 'patternlab:serve'

  gulp.task(name, gulp.series(taskPatternlabBuild, taskPatternlabConnect, taskQrCode, watcher))

  return name
}
