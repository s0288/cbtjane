const gulpStylelint = require('gulp-stylelint')
const { resolvePath, paths } = require('../setup')

module.exports = (gulp) => {
  const name = 'lint-css'

  gulp.task(name, () => gulp
    .src([`${resolvePath(paths().source.css)}/**/*.scss`])
    .pipe(gulpStylelint({
      reporters: [
        {
          formatter: 'string',
          console: true
        }
      ]
    }))
  )

  return name
}
