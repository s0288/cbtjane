const {
  resolvePath,
  paths
} = require('../setup')

module.exports = (gulp) => {
  const name = 'pl-copy:svg-gif'

  gulp.task(name, () =>
    gulp.src([
      '**/*.svg',
      '**/*.gif'
    ], { cwd: resolvePath(paths().source.images) })
      .pipe(gulp.dest(resolvePath(paths().public.images)))
  )

  return name
}
