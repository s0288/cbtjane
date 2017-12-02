const webpackConfig = require('../../../webpack.config.js')
const webpackStream = require('webpack-stream')
const webpack3 = require('webpack')

const { browserSync, resolvePath, paths } = require('../setup')

module.exports = (gulp) => {
  const name = 'pl-copy:js'

  gulp.task(name, () => gulp.src('app.js', { cwd: resolvePath(paths().source.js) })
    .pipe(webpackStream(webpackConfig, webpack3))
    .pipe(gulp.dest(resolvePath(paths().public.js)))
    .pipe(browserSync.stream())
  )

  return name
}
