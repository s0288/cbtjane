const { resolvePath, paths, browserSync } = require('../setup')

module.exports = (gulp) => {
  const name = 'pl-copy:css'

  gulp.task(name, () => gulp.src([`${resolvePath(paths().source.css)}/*.css`])
    .pipe(gulp.dest(resolvePath(paths().public.css)))
    .pipe(browserSync.stream()))

  return name
}
