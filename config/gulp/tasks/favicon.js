const { resolvePath, paths } = require('../setup')

module.exports = (gulp) => {
  const name = 'pl-copy:favicon'

  gulp.task(name, () => gulp.src('./favicon/*.*', { cwd: resolvePath(paths().source.root) })
    .pipe(gulp.dest(resolvePath(paths().public.root))))

  return name
}
