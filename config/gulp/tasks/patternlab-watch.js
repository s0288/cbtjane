module.exports = (gulp) => {
  /* eslint global-require: 0 */
  const name = 'patternlab:watch'
  const watcher = require('./watcher')(gulp)

  gulp.task(name, gulp.series('patternlab:build', watcher))

  return name
}
