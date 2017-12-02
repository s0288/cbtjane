module.exports = (gulp) => {
  const name = 'pl-assets'
  /* eslint global-require: 0 */
  const taskJs = require('./js')(gulp)
  const taskJpg = require('./jpg')(gulp)
  const taskPng = require('./png')(gulp)
  const taskSvg = require('./svg')(gulp)
  const taskFavicon = require('./favicon')(gulp)
  const taskFont = require('./font')(gulp)
  const taskFiles = require('./files')(gulp)
  const taskCss = require('./css')(gulp)
  const taskStyleguide = require('./styleguide')(gulp)
  const taskStyleguideCss = require('./styleguide-css')(gulp)
  const taskScss = require('./sass')(gulp)

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
      taskStyleguide,
      taskStyleguideCss,
    ),
    taskScss,
    (done) => {
      done()
    })
  )

  return name
}
