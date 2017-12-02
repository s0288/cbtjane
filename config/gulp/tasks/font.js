const {
  resolvePath,
  paths
} = require('../setup')

module.exports = (gulp) => {
  const name = 'pl-copy:font'

  gulp.task(name, () => gulp.src(`${resolvePath(paths().source.fonts)}/*.*`)
    .pipe(gulp.dest(resolvePath(paths().public.fonts))))

  return name
}
