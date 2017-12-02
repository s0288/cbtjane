const eslint = require('gulp-eslint')

module.exports = (gulp) => {
  const name = 'eslint'

  gulp.task(name, () => gulp.src(['server/**/*.js', 'source/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
  )

  return name
}
