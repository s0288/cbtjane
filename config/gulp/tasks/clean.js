const clean = require('gulp-clean')

const { resolvePath, paths } = require('../setup')

module.exports = (gulp) => {
  const name = 'clean'

  gulp.task(name, () => {
    const pathsToClear = [
      `${resolvePath(paths().public.root)}/index.html`,
      `${resolvePath(paths().public.root)}/styleguide/`,
      `${resolvePath(paths().public.root)}/patterns/`,
      `${resolvePath(paths().public.root)}/annotations/`,
      `${resolvePath(paths().public.root)}/dependencyGraph.json`
    ]
    return gulp.src(pathsToClear, { read: false }).pipe(clean())
  })

  return name
}
