const { resolvePath, paths } = require('../setup')

module.exports = (gulp) => {
  const name = 'pl-copy:files'

  gulp.task(name, () => gulp.src(`${resolvePath(paths().source.files)}/**/*`)
    .pipe(gulp.dest(resolvePath(paths().public.files))))

  return name
}
