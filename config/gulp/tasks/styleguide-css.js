const path = require('path')

const { resolvePath, paths, browserSync } = require('../setup')

module.exports = (gulp) => {
  const name = 'pl-copy:styleguide-css'

  gulp.task(name, () => gulp.src(`${resolvePath(paths().source.styleguide)}/**/*.css`)
    .pipe(gulp.dest((file) => {
      // flatten anything inside the styleguide into a single output dir per http://stackoverflow.com/a/34317320/1790362
      /* eslint no-param-reassign: 0 */
      file.path = path.join(file.base, path.basename(file.path))
      return resolvePath(path.join(paths().public.styleguide, '/css'))
    }))
    .pipe(browserSync.stream()))

  return name
}
