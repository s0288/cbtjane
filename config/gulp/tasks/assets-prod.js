module.exports = (gulp) => {
  /* eslint global-require: 0 */
  const name = 'pl-assets'

  const taskJs = require('./js')(gulp)
  const taskJpg = require('./jpg')(gulp)
  const taskPng = require('./png')(gulp)
  const taskSvg = require('./svg')(gulp)
  const taskFavicon = require('./favicon')(gulp)
  const taskFont = require('./font')(gulp)
  const taskFiles = require('./files')(gulp)
  const taskCss = require('./css')(gulp)
  const taskScss = require('./sass')(gulp)
  const taskClean = require('./clean')(gulp)

  gulp.task(name, gulp.series(
    gulp.parallel(
      taskJs,
      taskJpg,
      taskPng,
      taskSvg,
      taskFavicon,
      taskFont,
      taskFiles,
      taskCss,
    ),
    taskScss,
    taskClean,
    (done) => {
      done()
    })
  )

  return name
}
