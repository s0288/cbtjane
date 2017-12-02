const { resolvePath, paths, browserSync } = require('../setup')

module.exports = (gulp) => {
  const name = 'pl-copy:styleguide'

  gulp.task(name, () => gulp.src(`${resolvePath(paths().source.styleguide)}/**/!(*.css)`)
    .pipe(gulp.dest(resolvePath(paths().public.root)))
    .pipe(browserSync.stream()))

  return name
}
